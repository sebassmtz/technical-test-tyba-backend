import jwt from "jsonwebtoken"
import { GenerateTokenPayload } from "../interfaces/token"

export const GenerateToken = (
  payload: GenerateTokenPayload
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const secret = process.env.TOKEN_SECRET
    if (!secret) {
      return reject(new Error("TOKEN_SECRET is not defined"))
    }
    jwt.sign(
      payload,
      secret,
      {
        expiresIn: 86400,
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token as string)
      }
    )
  })
}

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const secret = process.env.TOKEN_SECRET
    if (!secret) {
      return reject(new Error("TOKEN_SECRET is not defined"))
    }
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) reject(error)
      resolve(decodedToken)
    })
  })
}
