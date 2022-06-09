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
       console.log(jokes.joke)
        return response.status(200).json(jokes.joke)
    } catch (error) {
            console.log(error)
            return response.status(500).json(error)
    }
}

export {findAllJokesController}