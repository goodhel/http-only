import m$auth from '../modules/auth.module'
import { Request, Response, Router } from 'express'
import response from '../helpers/response'

export const AuthController = Router()

/**
 * Login user
 * @param {string} email
 * @param {string} password
 */
AuthController.post('/login', m$auth.login)

/**
 * Logout user
 */
AuthController.get('/logout', m$auth.logout)

/**
 * Register a new user
 * @param {string} email
 * @param {string} name
 * @param {string} password
 */
AuthController.post('/register', async (req: Request, res: Response) => {
  const register = await m$auth.register(req.body)

  response.sendResponse(res, register)
})
