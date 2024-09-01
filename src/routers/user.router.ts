import { Router } from "express"

import { Usercontroller } from "../controllers/user.controller"
import { authRequired } from "../middlewares/ValidateToken"

export default function userRouter(router: Router): void {
  const userController = new Usercontroller()

  /**
   * @openapi
   * components:
   *  schemas:
   *    User:
   *     type: object
   *     required:
   *         - name
   *         - email
   *         - password
   *         - role
   *     example:
   *         name: Jhoe Doe
   *         email: jhon@gmail.com
   *         password: 12345566
   *         role: user
   *    GetAllUserResponse:
   *     type: array
   *     items:
   *       $ref: '#components/schemas/User'
   */

  /**
   * @openapi
   * /api/users:
   *  get:
   *     tags:
   *     - User
   *     summary: Get All users
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/GetAllUserResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.get(
    "/api/users",
    authRequired,
    userController.getUsers.bind(userController)
  )

  /**
   * @openapi
   * /api/users/{id}:
   *  get:
   *     tags:
   *     - User
   *     summary: Get User by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: user id
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/User'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   *       404:
   *        description: Not found
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/NotFound'
   */
  router.get(
    "/api/users/:id",
    authRequired,
    userController.getUser.bind(userController)
  )
}
