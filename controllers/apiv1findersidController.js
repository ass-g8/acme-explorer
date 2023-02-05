import * as service from '../services/apiv1findersidService.js';

export function findBy_id(req, res) {
    service.findBy_id(req, res);
}

export function updateFinder(req, res) {
    service.updateFinder(req, res);
}

export function deleteFinder(req, res) {
    service.deleteFinder(req, res);
}

