
import prisma from '../../db/prisma'

async function deleteUserController(request, response){
    
    try {
        
       const findUser = await prisma.user.findUnique({
           where: {
               id: request.params.id
           }
       })

       if(!findUser){
           return response.send('Piada não encontrada').status(500)
       }
       
       const deleteUser = await prisma.user.delete({
            where: {
                id: request.params.id
            }
        }).finally(async () => {
            await prisma.$disconnect()
          })

        if(deleteUser){
            return response.send('Usuário deletado').status(201)
        }
    
    } catch (error) {
        console.log(error)
        return response.send('Ocorreu um erro').status(404)
    }

   
}

export {deleteUserController}