import * as service from '../services/apiv1applicationsService.js';

export function getApplication(req, res) {
    service.getApplication(req, res);
}

export function addApplication(req, res) {
    service.addApplication(req, res);
}

