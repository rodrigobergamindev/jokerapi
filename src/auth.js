import jwt from "jsonwebtoken"

const auth = {
    username: "admin",
    password: "1234",
    secret: "Meu segredo super secreto",

    getToken() {
        let token = jwt.sign({ user: auth.username }, auth.secret, { expiresIn: 100 })
        
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

    authentication(req, res) {
        let username = req.body.username
        let password = req.body.password

        if (username === auth.username && password === auth.password) {
            let token = auth.getToken()
            res.cookie('token', token)
            res.status(200).json({ msg: "ok", token })
            return
        } else {
            res.status(400).json({ error: "Invalid user/password" })
            return
        }
    }
}

export default auth