
import prisma from '../../db/prisma'
import auth from '../../auth'

async function createUserController(request, response){

    try {
       const username = request.body.username
       const password = request.body.password
   
        const create = await prisma.user.create({
            data: {
                username,
                password
            }
        })

          if(create){
              return await auth.authentication(request, response)  
          }else{
              return response.send('Usuário já existe').status(404)
          }
       
    } catch (error) {
        console.log(error)
        return response.json(error)
    }

   
}

export {createUserController}