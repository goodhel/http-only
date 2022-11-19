import { NextFunction, Request, Response } from 'express'

// const isExpired = () =>  {
//   this.expiresAt < (new Date())
// }

const userSession = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies

  console.log(token)

  if (token) {
    next()
  } else {
    return res.status(401).json({
      status: false,
      error: 'Unauthorized'
    })
  }
}

export default userSession
