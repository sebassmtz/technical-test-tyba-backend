import dotenv from "dotenv"
import { Request, Response } from "express"
import axios from "axios"
import { TransactionService } from "../services/transaction.service"
import { GenerateTokenPayload } from "src/interfaces/token"
import jwt from "jsonwebtoken"

dotenv.config()

export class Restaurantcontroller {
  private readonly transactionsService: TransactionService

  constructor() {
    this.transactionsService = new TransactionService()
  }

  public getUserIdFromToken(req: Request): number | undefined {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
        throw new Error("Authorization header is missing")
      }

      const token = authHeader.split(" ")[1]
      if (!token) {
        throw new Error("Token is missing")
      }

      const secret = process.env.TOKEN_SECRET
      if (!secret) {
        throw new Error("Token secret is missing")
      }
      const verified = jwt.verify(token, secret) as GenerateTokenPayload
      const { userId } = verified
      return userId
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  public async getRestaurantForUbication(
    req: Request,
    res: Response
  ): Promise<Response> {
    // Obtener ciudad o coordenadas de la petición
    const city = req.query.city as string
    const lat = req.query.lat as string
    const lng = req.query.lng as string

    if (!city && (!lat || !lng)) {
      return res
        .status(400)
        .json({ error: "Debes proporcionar una ciudad o coordenadas." })
    }

    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY
    try {
      let location = `${lat},${lng}`
      // Si se proporciona una ciudad, obtener sus coordenadas
      if (city) {
        const geocodeUrl = `${process.env.GEOCODE_URL}/json?address=${encodeURIComponent(
          city
        )}&key=${GOOGLE_API_KEY}`
        const geocodeResponse = await axios.get(geocodeUrl)
        const { lat, lng } = geocodeResponse.data.results[0].geometry.location
        location = `${lat},${lng}`
      }
      // Buscar restaurantes cerca de la ubicación
      const placesUrl = `${process.env.PLACES_URL}/json?location=${location}&radius=1500&type=restaurant&key=${GOOGLE_API_KEY}`
      const placesResponse = await axios.get(placesUrl)

      // Validar el payload
      const userId = this.getUserIdFromToken(req)
      console.log("The user ID", userId)

      // Se crea la transacción del usuario
      if (userId) {
        await this.transactionsService.createTransaction({
          city: city,
          userId: userId,
          lat: location.split(",")[0],
          lng: location.split(",")[1],
        })
      }
      // Mapear los restaurantes encontrados
      const restaurants = placesResponse.data.results.map((restaurant: any) => {
        return {
          name: restaurant.name,
          address: restaurant.vicinity,
          location: restaurant.geometry.location,
        }
      })
      return res.json(restaurants)
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Ocurrió un error al obtener los restaurantes." })
    }
  }
}
