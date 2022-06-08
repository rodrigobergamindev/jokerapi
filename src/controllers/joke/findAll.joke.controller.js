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
        console.log('bateu aqui')
        return response.json(jokes).status(201)
    } catch (error) {
            return response.json(error).status(500)
    }
}

export {findAllJokeController}