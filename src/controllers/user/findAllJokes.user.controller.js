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

        if(jokes.length === 0){
            return response.send('Piadas não encontradas para este usuário').status(404)
        }
        return response.json(jokes).status(201)
    } catch (error) {
            return response.json(error).status(500)
    }
}

export {findAllJokesController}