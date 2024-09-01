import { Request, Response } from "express"
import { UserService } from "../services/user.service"

export class Usercontroller {
  private readonly userService: UserService

  constructor() {
    this.userService = new UserService()
  }
  public async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getUsers()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const user = await this.userService.getUserById(id)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
