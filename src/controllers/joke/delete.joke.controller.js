
import prisma from '../../db/prisma'

async function deleteJokeController(request, response){
    
    try {
        
       const findJoke = await prisma.joke.findUnique({
           where: {
               id: request.params.id
           }
       })

       if(!findJoke){
           return response.send('Piada não encontrada').status(500)
       }
       
       const deleteJoke = await prisma.joke.delete({
            where: {
                id: request.params.id
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