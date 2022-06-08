
import prisma from '../../db/prisma'

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
              return response.send('Usuário criado').status(201)
          }
       
    } catch (error) {
        return response.json(JSON.stringify(error))
    }

   
}

export {createUserController}