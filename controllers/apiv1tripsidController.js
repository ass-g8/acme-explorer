import * as service from '../services/apiv1tripsidService.js';

export function findBy_id(req, res) {
    service.findBy_id(req, res);
}

export function updateTrip(req, res) {
    service.updateTrip(req, res);
}

export function deleteTrip(req, res) {
    service.deleteTrip(req, res);
}

