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
                return response.status(404).send('Piada não encontrada')
            }
            return response.status(201).json(joke)
        }
       
        
    } catch (error) {
            return response.status(500).json(error)
    }
}

export {findByIdJokeController}