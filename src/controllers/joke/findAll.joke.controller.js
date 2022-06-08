import prisma from '../../db/prisma'

async function findAllJokeController(request, response){
    try {
        const jokes = await prisma.joke.findMany().finally(async () => {
            await prisma.$disconnect()
          })

        if(jokes.length === 0){
            return response.send('Piadas não encontradas').status(404)
        }
        return response.json(jokes).status(201)
    } catch (error) {
            return response.json(error).status(500)
    }
}

export {findAllJokeController}