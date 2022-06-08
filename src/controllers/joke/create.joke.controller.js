
import jwt from 'jsonwebtoken'
import prisma from '../../db/prisma'

async function createJokeController(request, response){
    
    try {
        const token = await jwt.decode(request.cookies.token, {
            json: true,
            complete: true
        })
    
        
       
       if(token){
        const create = await prisma.joke.create({
            data: {
                author: token.payload.user,
                description: 'anything',
                title: 'anything'
            }
        }).finally(async () => {
            await prisma.$disconnect()
          })

          if(create){
              return response.send('Piada criada').status(201)
          }
       }
    } catch (error) {
        return response.json(JSON.stringify(error))
    }

   
}

export {createJokeController}