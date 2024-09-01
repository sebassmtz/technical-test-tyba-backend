import express from "express"
import bodyParser from "body-parser"
import compression from "compression"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"

import swaggerDocs from "./helpers/Swagger"
import router from "./routers/index.router"
import { sequelize } from "./helpers/Database"

dotenv.config()

function boostrap(): void {
  const app = express()

  app.use(express.json())
  app.use(
    cors({
      credentials: true,
    })
  )
  app.use(morgan("dev"))
  app.use(compression())
  app.use(bodyParser.json())

  sequelize
    .sync()
    .then(() => {
      console.log("[DB] - Connected to database")
    })
    .then(() => {
      const PORT = process.env.PORT || 3000
      app.listen(PORT, () => {
        console.log(`[APP] - Started application on port ${PORT}`)
        router(app)
        swaggerDocs(app, Number(PORT))
      })
    })
    .catch((err) => {
      console.error("[DB] - Error connecting to database", err)
    })
}

boostrap()
