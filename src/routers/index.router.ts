import { Router } from "express"
import healthRouter from "./health.router"

const router = Router()

export default function (app: Router): Router {
  /**
   *@openapi
   * components:
   *  schemas:
   *   BadRequest:
   *    type: object
   *    required:
   *     - message
   *    example:
   *      message: error message
   *   Deleted:
   *    type: object
   *    required:
   *     - message
   *    example:
   *      message: deleted
   *   NotFound:
   *    type: object
   *    required:
   *      - message
   *    example:
   *      message: Not found
   */

  healthRouter(app)

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" })
  })

  return router
}
