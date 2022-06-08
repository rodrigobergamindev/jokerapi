import prisma from '../../db/prisma'

async function findByIdJokeController(request, response){
    try {

        const id = request.params.id
        if(!id) return response.send('Parâmetros não informados').status(404)
        
        if(id){
            const joke = await prisma.joke.findUnique({
                where: {
                    id: request.params.id
                },
                include: {
                    author: {
                        select: {
                            username: true
                        }
                    }
                }
            }).finally(async () => {
                await prisma.$disconnect()
              })
    
            if(!joke){
                return response.send('Piada não encontrada').status(404)
            }
            return response.json(joke).status(201)
        }
       
        
    } catch (error) {
            return response.json(error).status(500)
    }
}

export {findByIdJokeController}