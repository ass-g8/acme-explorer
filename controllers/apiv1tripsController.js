import * as service from '../services/apiv1tripsService.js';

export function getTrip(req, res) {
    service.getTrip(req, res);
}

export function addTrip(req, res) {
    service.addTrip(req, res);
}

