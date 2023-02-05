import * as service from '../services/apiv1findersService.js';

export function getFinder(req, res) {
    service.getFinder(req, res);
}

export function addFinder(req, res) {
    service.addFinder(req, res);
}

