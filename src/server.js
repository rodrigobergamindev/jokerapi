
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {router} from './routes/index'
import auth from './auth'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert {type: 'json'};
dotenv.config()

  
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'https://jokerapi-ustj.netlify.app',
  credentials: true,
  allowedHeaders: [
    "Access-Control-Allow-Origin", "*",
    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  ]
})); 
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.post('/auth', auth.authentication)
app.post('/logout', auth.logout)
app.use(router)
const PORT = process.env.PORT || 80

app.listen(PORT, function() {
  console.log(`Servidor rodando na porta ${PORT}`)
});