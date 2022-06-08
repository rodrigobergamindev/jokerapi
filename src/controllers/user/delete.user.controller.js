
import prisma from '../../db/prisma'

async function deleteUserController(request, response){
    
    try {
        const username = request.params.username
       if(username){
        
        const findUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
 
        if(!findUser){
            return response.send('Usuário não encontrado').status(404)
        }
        const deleteUser = await prisma.user.delete({
             where: {
                 username: username
             }
         }).finally(async () => {
             await prisma.$disconnect()
           })

        if(deleteUser){
            return response.send('Usuário deletado').status(201)
        }
       }
         
    } catch (error) {
        return response.send('Usuário não encontrado').status(404)
    }

   
}

export {deleteUserController}