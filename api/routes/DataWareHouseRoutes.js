"use strict";
import {
  listIndicators,
  lastIndicator,
  generateIndicators,
  amountSpentByExplorer,
  explorersByAmountSpent
} from "../controllers/DataWareHouseController.js";
import { cube1Validator, cube2Validator } from "../controllers/validators/DataWareHouseValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { periodDecoder } from "../middlewares/PeriodDecoder.js";

export default function (app) {
  app.route("/api/v1/dashboard")
    .get(listIndicators)
    .post(generateIndicators);

  app.route("/api/v1/dashboard/latest")
    .get(lastIndicator);

  app.route("/api/v1/cube/amountSpentByExplorer")
    .post(
      cube1Validator,
      handleExpressValidation,
      periodDecoder,
      amountSpentByExplorer);

  app.route("/api/v1/cube/explorersByAmountSpent")
    .post(
      cube2Validator,
      handleExpressValidation,
      periodDecoder,
      explorersByAmountSpent);
}
