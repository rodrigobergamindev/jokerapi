import { Router } from 'express'

import { createJokeController } from '../controllers/joke/create.joke.controller'
import { deleteJokeController } from '../controllers/joke/delete.joke.controller'
import { findAllJokeController } from '../controllers/joke/findAll.joke.controller'
import { findByIdJokeController } from '../controllers/joke/findById.joke.controller'
import auth from '../auth'

const jokeRoutes = Router()

jokeRoutes.post("/:username", auth.middlewareAuth, (request, response) => {
    
    return createJokeController(request, response)
})

jokeRoutes.delete("/:username/:id", auth.middlewareAuth, (request, response) => {
    
    return deleteJokeController(request, response)
})


jokeRoutes.get("/", (request, response) => {
    
    return findAllJokeController(request, response)
})

jokeRoutes.get("/:id", (request, response) => {
    
    return findByIdJokeController(request, response)
})


export { jokeRoutes }