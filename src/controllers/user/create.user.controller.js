
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
          }else{
              return response.send('Usuário já existe').status(404)
          }
       
    } catch (error) {
        console.log(error)
        return response.json(error)
    }

   
}

export {createUserController}