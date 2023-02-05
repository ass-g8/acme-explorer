import * as service from '../services/apiv1actorsidService.js';

export function findBy_id(req, res) {
    service.findBy_id(req, res);
}

export function updateActor(req, res) {
    service.updateActor(req, res);
}

export function deleteActor(req, res) {
    service.deleteActor(req, res);
}

