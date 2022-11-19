import { Application, Router } from 'express'
import { AuthController } from './controllers/AuthController'
import { UserController } from './controllers/UserController'

const _routes: [string, Router][] = [
  ['users', UserController],
  ['', AuthController]
]

const routes = (app: Application) => {
  _routes.forEach(route => {
    const [url, controller] = route
    app.use(`/api/${url}`, controller)
  })
}

export default routes
