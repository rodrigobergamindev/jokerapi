import jwt from "jsonwebtoken"
import prisma from './db/prisma'


const auth = {
    secret: "super secret",
    getToken(username) {
       
        let token = jwt.sign({ user: username }, auth.secret, { expiresIn: 2592000 })
        
        return token
    },

    async middlewareAuthentication(req, res, next) {
        const authToken = req.cookies.token
        const author = req.params.username
       
        
        if (authToken == undefined) {
            res.status(400).json({ error: "Token not found" })
            return
        }
        let parts = authToken.split(" ")
        let token = ""
        if (parts.length > 1) {
            token = parts[1]
        } else {
            token = parts[0]
        }
        jwt.verify(token, auth.secret, (err, tokenDecoded) => {
            if (err) {
                res.status(400).json({ error: "INVALID Token" })
                return
            }
            
            if(author !== tokenDecoded.user) return res.status(401).json({error: "Unauthorized"})
            next()
        })
    },

    async authentication(req, res) {
        let username = req.body.username
        let password = req.body.password

        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        }).finally(async () => {
            await prisma.$disconnect()
          })
          
        if(!user) return res.status(400).json({error: "Invalid User or Password"})

        if (username === user.username  &&  password === user.password) {
            let token = auth.getToken(user.username)
            res.cookie('token', token, { sameSite: 'none', secure: true})
            
            res.status(200).json({ msg: "ok", token})
            return
        } else {
            res.status(400).json({ error: "Invalid user/password" })
            return
        }
    },

    async logout(req, res) {
        const token = req.cookies.token
       
        if(!token) return res.status(400).json({error: "User not sign in"})

        if (token) {
           res.clearCookie('token')
           return res.status(200).json({msg: 'Logout'})
        } 
    }
}

export default auth