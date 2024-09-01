import dotenv from "dotenv"
import { Request, Response } from "express"
import axios from "axios"

dotenv.config()

export class Restaurantcontroller {
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
