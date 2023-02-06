import * as service from "../services/apiv1applicationsidchangestatusService.js";

export function updateApplicationStatus(req, res) {
  service.updateApplicationStatus(req, res);
}
