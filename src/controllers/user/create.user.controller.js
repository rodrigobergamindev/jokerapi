
import prisma from '../../db/prisma'
import auth from '../../auth'

async function createUserController(request, response){

    try {
       const username = request.body.username
       const password = request.body.password
       
       const findUser = await prisma.user.findUnique({
           where: {
               username
           }
       })
       
       if(findUser) return response.send('Usuário já existe').status(409)
   
        const create = await prisma.user.create({
            data: {
                username,
                password
            }
        })

          if(create){
              return await auth.authentication(request, response)  
          }
       
    } catch (error) {
        console.log(error)
        return response.json(error)
    }

   
}

export {createUserController}