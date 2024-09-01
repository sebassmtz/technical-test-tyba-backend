import { Router } from "express"

import { TransactionsController } from "../controllers/transaction.controller"
import { authRequired } from "../middlewares/ValidateToken"

export default function transactionsRouter(router: Router): void {
  const transactionsController = new TransactionsController()

  /**
   * @openapi
   * components:
   *  schemas:
   *    Transaction:
   *     type: object
   *     required:
   *         - city
   *         - lat
   *         - lng
   *         - userId
   *         - createdAt
   *     example:
   *         city: Lima
   *         lat: -12.043180
   *         lng: -77.028236
   *         userId: 1
   *         createdAt: 2021-09-01T00:00:00.000Z
   *    GetAllTransactionResponse:
   *     type: array
   *     items:
   *       $ref: '#components/schemas/Transaction'
   */

  /**
   * @openapi
   * /api/transactions:
   *  get:
   *     tags:
   *     - Transactions
   *     summary: Get All Transactions
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/GetAllTransactionResponse'
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BadRequest'
   */
  router.get(
    "/api/transactions",
    authRequired,
    transactionsController.getTransactions.bind(transactionsController)
  )

  /**
   * @openapi
   * /api/transactions/{id}:
   *  get:
   *     tags:
   *     - Transactions
   *     summary: Get Transaction by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: number
   *         description: Transaction id
   *     responses:
   *       200:
   *        description: success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/Transaction'
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
    "/api/transactions/:id",
    authRequired,
    transactionsController.getTransaction.bind(transactionsController)
  )
}
