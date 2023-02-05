import * as service from '../services/apiv1actorsService.js';

export function getActor(req, res) {
    service.getActor(req, res);
}

export function addActor(req, res) {
    service.addActor(req, res);
}

