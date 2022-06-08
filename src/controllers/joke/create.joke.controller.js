
import jwt from 'jsonwebtoken'
import prisma from '../../db/prisma'

async function createJokeController(request, response){
    
    try {
        const token = await jwt.decode(request.cookies.token, {
            json: true,
            complete: true
        })
    
        
       
       if(token){
        const username = token.payload.user
        if(!username) return response.send('Parâmetros não informados').status(404)
        
        if(username){
            const {category, title, description} = request.body
            const create = await prisma.joke.create({
            data: {
                category,
                title,
                description,
                author: {
                    connect: {
                        username: username
                    }
                }
            }
        
        }).finally(async () => {
            await prisma.$disconnect()
          })
         
          if(create){
              return response.send('Piada criada').status(201)
          }else{
              return response.send('Ocorreu um erro criar piada').status(404)
          }
        }

        
       }
    } catch (error) {
        console.log(error)
        return response.json(error)
    }

   
}

export {createJokeController}