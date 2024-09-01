import { Router } from "express"

import { Restaurantcontroller } from "../controllers/restaurant.controller"
import { authRequired } from "../middlewares/ValidateToken"

export default function restaurantRouter(router: Router): void {
  const restaurantController = new Restaurantcontroller()

  /**
   * @openapi
   * components:
   *  schemas:
   *   RestaurantQuery:
   *    type: object
   *    properties:
   *      city:
   *        type: string
   *        description: The name of the city
   *      lat:
   *        type: string
   *        description: The latitude coordinate
   *      lng:
   *        type: string
   *        description: The longitude coordinate
   *    example:
   *       city: New York
   *       lat: 40.712776
   *       lng: -74.005974
   */

  /**
   * @openapi
   * /api/restaurants:
   *  get:
   *     tags:
   *     - Restaurants
   *     summary: Get restaurants by city or coordinates
   *     parameters:
   *       - in: query
   *         name: city
   *         schema:
   *           type: string
   *         description: The name of the city
   *       - in: query
   *         name: lat
   *         schema:
   *           type: string
   *         description: The latitude coordinate
   *       - in: query
   *         name: lng
   *         schema:
   *           type: string
   *         description: The longitude coordinate
   *     responses:
   *       200:
   *        description: List of restaurants
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              items:
   *                type: object
   *                properties:
   *                  name:
   *                    type: string
   *                  address:
   *                    type: string
   *                  rating:
   *                    type: number
   *       400:
   *        description: Bad request
   *        content:
   *          application/json:
   *            schema:
   *               $ref: '#/components/schemas/BadRequest'
   */
  router.get(
    "/api/restaurants",
    authRequired,
    restaurantController.getRestaurantForUbication.bind(restaurantController)
  )
}
