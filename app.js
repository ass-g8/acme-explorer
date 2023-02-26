import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import actorRoutes from "./api/routes/ActorRoutes.js";
import applicationRoutes from "./api/routes/ApplicationRoutes.js";
import configurationRoutes from "./api/routes/ConfigurationRoutes.js";
import dataWareHouseRoutes from "./api/routes/DataWareHouseRoutes.js";
import tripRoutes from "./api/routes/TripRoutes.js";
import initMongoDBConnection from "./api/config/mongoose.js";
import swagger from "./docs/swagger.js";
import admin from "firebase-admin";
import { initializeDataWarehouseJob } from "./api/services/DataWarehouseServiceProvider.js";
dotenv.config();

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT) || {};
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

actorRoutes(app);
applicationRoutes(app);
configurationRoutes(app);
dataWareHouseRoutes(app);
tripRoutes(app);
swagger(app);

initMongoDBConnection()
  .then(() => {
    app.listen(port, function () {
      console.log("ACME-Explorer RESTful API server started on: " + port);
    });
  })
  .catch((err) => {
    console.error("ACME-Explorer RESTful API could not connect to DB " + err);
  });

initializeDataWarehouseJob();
