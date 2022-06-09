import jwt from "jsonwebtoken"
import prisma from './db/prisma'


const auth = {
    secret: "super secret",
    getToken(username) {
       
        let token = jwt.sign({ user: username }, auth.secret, { expiresIn: 2592000 })
        
        return token
    },

    async middlewareAuth(req, res, next) {
        const authToken = req.cookies.token
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
                res.status(400).json({ error: "INAVILID Token" })
                return
            }
            console.log(tokenDecoded);
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
            res.cookie('token', token, { sameSite: 'None', secure: true})
            res.status(200).json({ msg: "ok", token })
            return
        } else {
            res.status(400).json({ error: "Invalid user/password" })
            return
        }
    }
}

export default auth