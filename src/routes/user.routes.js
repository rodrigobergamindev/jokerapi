import { Router } from 'express'


import auth from '../auth'
import { createUserController } from '../controllers/user/create.user.controller'
import { deleteUserController } from '../controllers/user/delete.user.controller'
import { findAllJokesController } from '../controllers/user/findAllJokes.user.controller'

const userRoutes = Router()

userRoutes.post("/", (request, response) => {

    return createUserController(request,response)
})

userRoutes.delete("/:username", auth.middlewareAuthentication, (request, response) => {
    
    return deleteUserController(request, response)
})


userRoutes.get("/:username/jokes", auth.middlewareAuthentication, (request, response) => {
    
    return findAllJokesController(request, response)
})




export { userRoutes }