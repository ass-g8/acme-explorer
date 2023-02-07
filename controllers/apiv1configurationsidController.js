import * as service from "../services/apiv1configurationsidService.js";

export function findBy_id(req, res) {
  service.findBy_id(req, res);
}

export function updateConfiguration(req, res) {
  service.updateConfiguration(req, res);
}

export function deleteConfiguration(req, res) {
  service.deleteConfiguration(req, res);
}
