import * as service from '../services/apiv1configurationsService.js';

export function getConfiguration(req, res) {
    service.getConfiguration(req, res);
}

export function addConfiguration(req, res) {
    service.addConfiguration(req, res);
}

