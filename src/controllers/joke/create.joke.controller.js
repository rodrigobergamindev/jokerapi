
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
          }
       }
    } catch (error) {
        console.log(error)
        return response.json(error)
    }

   
}

export {createJokeController}