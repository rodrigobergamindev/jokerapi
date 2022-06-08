
import prisma from '../../db/prisma'
import jwt from 'jsonwebtoken'

async function deleteJokeController(request, response){
    
    try {

        const token = await jwt.decode(request.cookies.token, {
            json: true,
            complete: true
        })

        const id = request.params.id
        const author = token.payload.user
        
       const findJoke = await prisma.joke.findUnique({
           where: {
               id
           },
           select: {
               author: {
                   select: {
                       username: true
                   }
               }
           }
       })

       if(!findJoke){
           return response.send('Piada não encontrada').status(404)
       }

       if(findJoke.author.username !== author) return response.send('Você não pode realizar esta ação').status(400)
       
       const deleteJoke = await prisma.joke.delete({
            where: {
                id
            }
        }).finally(async () => {
            await prisma.$disconnect()
          })

        if(deleteJoke){
            return response.send('Piada deletada').status(201)
        }
    
    } catch (error) {
        console.log(error)
        return response.send('Ocorreu um erro').status(404)
    }

   
}

export {deleteJokeController}