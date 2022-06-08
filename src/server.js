
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {router} from './routes/index'
import auth from './auth'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser())

app.use(router)
app.post('/auth', auth.authentication)

app.listen(process.env.PORT, function() {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
});