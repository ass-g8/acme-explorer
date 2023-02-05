import * as service from '../services/apiv1applicationsidService.js';

export function findBy_id(req, res) {
    service.findBy_id(req, res);
}

export function updateApplication(req, res) {
    service.updateApplication(req, res);
}

export function deleteApplication(req, res) {
    service.deleteApplication(req, res);
}

