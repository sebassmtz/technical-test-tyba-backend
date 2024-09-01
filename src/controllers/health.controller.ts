import { Request, Response } from "express"

export class HealthController {
  public async handle(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ message: "OK" })
  }
}
