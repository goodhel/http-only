import { NextFunction, Request, Response } from 'express'

interface DataType {
    status: boolean
    data?: any
    error?: any
    code?: number
}

class _response {
  sendResponse = (res: Response, data: DataType) => {
    try {
      if (data.code) {
        res.status(data.code)

        delete data.code

        res.send(data)
        return true
      }

      res.status(data && data.status ? 200 : 400)
      res.send(data)

      return true
    } catch (error) {
      console.error('sendResponse response helper Error: ', error)

      res.status(400).send({
        status: false,
        error
      })

      return false
    }
  }

  errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).send({
      status: false,
      error: error.message
    })
  }
}

export default new _response()
