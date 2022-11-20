import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import routes from './routes'
import response from './helpers/response'

const app = express()
const port = process.env.PORT || 5001

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', async (req: Request, res: Response) => {
  res.send({
    status: true,
    data: 'Hello this is Api From Backend Http Only'
  })
})

routes(app)

app.use(response.errorHandler)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
