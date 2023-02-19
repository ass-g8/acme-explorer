'use strict'
import { 
    listIndicators,
    generateIndicators
} from '../controllers/DataWareHouseController.js';

export default function (app) {

  app.route('/api/v1/dashboard')
    .get(listIndicators)
    .post(generateIndicators)
}