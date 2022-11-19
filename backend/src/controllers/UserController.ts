import m$user from '../modules/user.module'
import { Request, Response, Router } from 'express'
import response from '../helpers/response'
import userSession from '../helpers/middleware'

export const UserController = Router()

/**
 * Get all users
 */
UserController.get('/', userSession, async (req: Request, res: Response) => {
  const list = await m$user.listUser()

  response.sendResponse(res, list)
})
