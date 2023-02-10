import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import actorRoutes from "./api/routes/ActorRoutes.js";
import applicationRoutes from "./api/routes/ApplicationRoutes.js";
import configurationRoutes from "./api/routes/ConfigurationRoutes.js";
import finderRoutes from "./api/routes/FinderRoutes.js";
import tripRoutes from "./api/routes/TripRoutes.js";
import initMongoDBConnection from "./api/config/mongoose.js";
import swagger from "./docs/swagger.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

actorRoutes(app);
applicationRoutes(app);
configurationRoutes(app);
finderRoutes(app);
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
