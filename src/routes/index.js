import {Router} from 'express'
import {jokeRoutes} from './joke.routes'
import {userRoutes} from './user.routes'

const router = Router()

router.use('/', jokeRoutes)
router.use('/user', userRoutes)


export {router}