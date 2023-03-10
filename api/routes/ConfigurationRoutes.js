"use-strict";
import {
  getConfiguration,
  updateConfiguration,
} from "../controllers/ConfigurationController.js";
import { configurationValidator } from "../controllers/validators/ConfigurationValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";

export default function (app) {
  app.route("/api/v1/configurations")
    .get(getConfiguration);

  app.route("/api/v1/configurations/:id")
    .put(
      configurationValidator,
      handleExpressValidation,
      updateConfiguration
    );
}
