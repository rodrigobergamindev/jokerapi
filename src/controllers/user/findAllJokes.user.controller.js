import prisma from '../../db/prisma'

async function findAllJokesController(request, response){
    try {
        const username = request.params.username
        const jokes = await prisma.user.findUnique({
            where: {
                username
            },
            include: {
                joke: {
                    include: {
                        author: {
                            select: {
                                username: true
                            }
                        }
                    }
                }
            }
        })
       
        return response.json(jokes.joke).status(200)
    } catch (error) {
            return response.json(error).status(500)
    }
}

export {findAllJokesController}