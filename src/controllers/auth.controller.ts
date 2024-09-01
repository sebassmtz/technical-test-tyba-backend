import { Request, Response } from "express"
import { GenerateToken } from "../helpers/Token"
import { EncryptPassword, ComparePassword } from "../helpers/Utils"

// import jwt from "jsonwebtoken"
import { User } from "../models/user.model"

export class AuthController {
  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body
      const encryptedPassword = await EncryptPassword(password)
      const userEmailFound = await User.findOne({ where: { email } })
      if (userEmailFound) {
        return res.status(400).json({ error: "User already exists" })
      }
      const user = await User.create({
        name,
        email,
        password: encryptedPassword,
      })

      const token = await GenerateToken({
        userId: user.id,
        email,
      })
      res.header("Authorization", `Bearer ${token}`)
      return res.status(201).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }
      const isPasswordValid = await ComparePassword(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" })
      }
      const token = await GenerateToken({
        userId: user.id,
        email,
      })
      res.header("Authorization", `Bearer ${token}`)
      return res.status(200).json({ token })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async verifyToken(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers.authorization?.split(" ")[1]

      if (!token) {
        return res.status(401).json({ message: "Not Token ,Unauthorized" })
      }

      try {
        // const verified = jwt.verify(token, process.env.TOKEN_SECRET)

        // const { userId } = verified as GenerateTokenPayload

        // const userFind = await getUserById(userId)

        // if (!userFind) {
        //   return res.status(400).json({ message: "The user does not exists" })
        // }
        return res.status(200).json({ isAuthorizaded: true })
      } catch (err) {
        return res.status(400).json({ message: err })
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
