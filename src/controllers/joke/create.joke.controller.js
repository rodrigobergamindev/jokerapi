
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
        
        if(!username) return response.status(404).send('Parâmetros não informados')
        
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
              return response.status(201).send('Piada criada')
          }else{
              return response.status(404).send('Ocorreu um erro criar piada')
          }
        }

        
       }
    } catch (error) {
        console.log(error)
        return response.json(error)
    }

   
}

export {createJokeController}