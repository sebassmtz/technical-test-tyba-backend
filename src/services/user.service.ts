import { User } from "../models/user.model"
import { CreateUser } from "../interfaces/user"

export class UserService {
  public async getUsers(): Promise<User[]> {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      })
      return users
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async getUserById(id: number): Promise<User | null> {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      })
      return user
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["password"] },
      })
      return user
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async createUser(data: CreateUser): Promise<User> {
    try {
      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
      })
      return user
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
