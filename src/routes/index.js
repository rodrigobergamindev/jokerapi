import {Router} from 'express'
import {jokeRoutes} from './joke.routes'

const router = Router()

router.use('/jokes', jokeRoutes)


export {router}