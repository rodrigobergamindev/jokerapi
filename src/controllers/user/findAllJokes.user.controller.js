import prisma from '../../db/prisma'

async function findAllJokesController(request, response){
    try {
        const id = request.params.id
        const jokes = await prisma.user.findUnique({
            where: {
                id
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