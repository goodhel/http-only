import prisma from '../helpers/db'
import { debug } from '../config/app.config.json'

class _user {
  listUser = async () => {
    try {
      const list = await prisma.user.findMany()

      return {
        status: true,
        data: list
      }
    } catch (error) {
      if (debug) {
        console.error('listUser user module Error: ', error)
      }

      return {
        status: false,
        error
      }
    }
  }
}

export default new _user()
