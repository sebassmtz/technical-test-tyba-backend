import { Request, Response } from "express"
import { TransactionService } from "../services/transaction.service"
export class TransactionsController {
  private readonly transactionService: TransactionService
  constructor() {
    this.transactionService = new TransactionService()
  }

  public async getTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const transactions = await this.transactionService.getTransactions()
      return res.status(200).json(transactions)
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message })
    }
  }

  public async getTransaction(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      const transaction = await this.transactionService.getTransactionById(id)
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" })
      }
      return res.status(200).json(transaction)
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message })
    }
  }
}
