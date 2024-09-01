import { Router } from "express"
import { HealthController } from "../controllers/health.controller"

export default function productRouter(router: Router): void {
  const healthController = new HealthController()

  /**
   *@openapi
   * components:
   *  schemas:
   *   Health:
   *    type: object
   *    required:
   *     - message
   *    example:
   *      message: OK
   */

  /**
   * @openapi
   * /health:
   *  get:
   *     tags:
   *     - Health
   *     summary: Health`s endpoint
   *     security: []
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Health'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.get("/health", healthController.handle.bind(healthController))
}
