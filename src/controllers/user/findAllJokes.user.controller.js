import prisma from '../../db/prisma'

async function findAllJokesController(request, response){
    try {
        const username = request.params.username
        const jokes = await prisma.user.findUnique({
            where: {
                username
            },
            select: {
               joke: true
            }
        })
   
        return response.json(jokes).status(201)
    } catch (error) {
            return response.json(error).status(500)
    }
}

export {findAllJokesController}