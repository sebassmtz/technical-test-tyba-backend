import { Router } from "express"

import { AuthController } from "../controllers/auth.controller"

export default function authRouter(router: Router): void {
  const authController = new AuthController()

  /**
   * @openapi
   * components:
   *  schemas:
   *   createUser:
   *    type: object
   *    required:
   *      - name
   *      - password
   *      - email
   *    properties:
   *      name:
   *        type: string
   *        description: The username for the user min 5 characters
   *        required: true
   *      password:
   *        type: string
   *        description: The password for the user min 6 characters
   *        required: true
   *      email:
   *        type: string
   *        description: The email for the user
   *        required: true
   *    example:
   *       name: John
   *       password: stringPassword123
   *       email: jhon.doe@example.com
   */

  /**
   * @openapi
   * components:
   *  schemas:
   *    TokenResponse:
   *     type: object
   *     required:
   *       - token
   *     example:
   *       token: string
   *    LoginInput:
   *      type: object
   *      required:
   *        - email
   *        - password
   *      properties:
   *        email:
   *          type: string
   *          default: jhon.doe@example.com
   *        password:
   *          type: string
   *          default: stringPassword123
   *    LoginResponse:
   *      type: object
   *      properties:
   *        id:
   *          type: string
   *        username:
   *          type: string
   *        password:
   *          type: string
   *        isActive:
   *          type: boolean
   *        email:
   *          type: string
   *        personId:
   *          type: string
   *    loginResponse:
   *      type: object
   *      required:
   *       - token
   *      properties:
   *        token:
   *          type: string
   */

  /**
   * @openapi
   * /api/register:
   *  post:
   *     tags:
   *     - Auth
   *     summary: Register a new user
   *     security: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/createUser'
   *     responses:
   *       200:
   *        description: User registered successfully
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   *
   */
  router.post("/api/register", authController.register.bind(authController))
  /**
   * @openapi
   * '/api/login':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Login a User
   *     security: []
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/LoginInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/loginResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.post("/api/login", authController.login.bind(authController))
}
