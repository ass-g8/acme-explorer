'use strict'
import { 
    listIndicators,
    generateIndicators,
    amountSpentByExplorer
} from '../controllers/DataWareHouseController.js';
import { cubeValidator } from '../controllers/validators/DataWareHouseValidator.js';
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { periodDecoder } from "../middlewares/PeriodDecoder.js";

export default function (app) {

  app.route('/api/v1/dashboard')
    .get(listIndicators)
    .post(generateIndicators)

  app.route('/api/v1/cube')
    .post(
      cubeValidator,
      handleExpressValidation,
      periodDecoder,
      amountSpentByExplorer)
}