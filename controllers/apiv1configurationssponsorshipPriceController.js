import * as service from '../services/apiv1configurationssponsorshipPriceService.js';

export function findBysponsorshipPrice(req, res) {
    service.findBysponsorshipPrice(req, res);
}

export function updateConfiguration(req, res) {
    service.updateConfiguration(req, res);
}

export function deleteConfiguration(req, res) {
    service.deleteConfiguration(req, res);
}

