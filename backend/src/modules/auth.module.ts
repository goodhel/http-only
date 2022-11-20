import { Request, Response } from 'express'
import prisma from '../helpers/db'
import { debug } from '../config/app.config.json'
import Joi from 'joi'
import bcrypt from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

class _auth {
  register = async (body: any) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().required()
      }).options({ abortEarly: false })

      const validation = schema.validate(body, { convert: false })

      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)

        return {
          status: false,
          error: errorDetails.join(', ')
        }
      }

      const { email, name, password } = body

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: bcrypt.hashSync(password, 10)
        }
      })

      return {
        status: true,
        data: user
      }
    } catch (error) {
      if (debug) {
        console.log('register auth module Error: ', error)
      }

      return {
        status: false,
        error
      }
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }).options({ abortEarly: false })

      const validation = schema.validate(req.body, { convert: false })

      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)

        return res.status(400).send({
          status: false,
          error: errorDetails.join(', ')
        })
      }

      const { email, password } = req.body

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return res.status(404).send({
          status: false,
          error: 'Sorry, user not found'
        })
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password)

      if (!isPasswordValid) {
        return res.status(401).send({
          status: false,
          error: 'Sorry, wrong password'
        })
      }

      // set the expiry time as 120s after the current time
      const now = new Date()
      const expiresAt = new Date(+now + 3600 * 1000)

      console.log(expiresAt.toLocaleString())

      const sessionToken = uuidV4()

      res.cookie('token', sessionToken, { expires: expiresAt, httpOnly: true })

      await prisma.userSession.create({
        data: {
          user_id: user.id,
          token: sessionToken,
          content_type: req.headers['content-type'],
          user_agent: req.headers['user-agent'],
          ip_address: req.headers.host
        }
      })

      res.status(200).send({
        status: true,
        data: {
          user,
          token: sessionToken
        }
      })
    } catch (error) {
      if (debug) {
        console.log('login auth module Error: ', error)
      }

      res.status(400).send({
        status: false,
        error
      })
    }
  }

  logout = async (req: Request, res: Response) => {
    try {
      const { token } = req.cookies

      if (!token) {
        return res.status(401).send({
          status: false,
          error: 'Unauthorized'
        })
      }

      await prisma.userSession.delete({
        where: {
          token
        }
      })

      // remove token from cookie
      res.cookie('token', '', { expires: new Date() })

      res.status(200).send({
        status: true,
        data: 'Logout success'
      })
    } catch (error) {
      if (debug) {
        console.log('logout auth module Error: ', error)
      }

      return res.status(400).send({
        status: false,
        error
      })
    }
  }

  refreshToken = async (req: Request, res: Response) => {
    try {
      const schema = Joi.object({
        token: Joi.string().required()
      }).options({ abortEarly: false })

      const validation = schema.validate(req.body, { convert: false })

      console.log(validation)

      if (validation.error) {
        const errorDetails = validation.error.details.map(detail => detail.message)

        return res.status(400).send({
          status: false,
          error: errorDetails.join(', ')
        })
      }

      const { token } = req.body

      const sess = await prisma.userSession.findUnique({
        where: {
          token
        }
      })

      if (!sess) {
        return res.status(404).send({
          status: false,
          error: 'Sorry, user session not found'
        })
      }

      // set the expiry time as 120s after the current time
      const now = new Date()
      const expiresAt = new Date(+now + 120 * 1000)

      console.log(expiresAt.toLocaleString())

      const sessionToken = uuidV4()

      res.cookie('token', sessionToken, { expires: expiresAt, httpOnly: true })

      await prisma.userSession.update({
        where: {
          token
        },
        data: {
          token: sessionToken
        }
      })

      return res.status(200).send({
        status: true,
        data: sessionToken
      })
    } catch (error) {
      if (debug) {
        console.error('refreshToken auth module Error: ', error)
      }

      return res.status(400).send({
        status: false,
        error
      })
    }
  }
}

export default new _auth()
