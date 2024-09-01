import { CreateTransaction } from "src/interfaces/transaction"
import { Transactions } from "../models/transactions.model"

export class TransactionService {
  public async getTransactions(): Promise<Transactions[]> {
    try {
      const transactions = await Transactions.findAll()
      return transactions
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async getTransactionById(id: number): Promise<Transactions | null> {
    try {
      const transaction = await Transactions.findByPk(id)
      return transaction
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  public async createTransaction(
    data: CreateTransaction
  ): Promise<Transactions> {
    try {
      const transaction = await Transactions.create({
        city: data.city,
        lat: data.lat,
        lng: data.lng,
        userId: data.userId,
      })
      return transaction
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }
}
