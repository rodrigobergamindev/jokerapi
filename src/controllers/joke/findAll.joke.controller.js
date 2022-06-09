import prisma from '../../db/prisma'

async function findAllJokeController(request, response){
    try {
        const jokes = await prisma.joke.findMany({
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
        
        return response.status(201).json(jokes)
    } catch (error) {
        
            return response.status(500).json(error)
    }
}

export {findAllJokeController}