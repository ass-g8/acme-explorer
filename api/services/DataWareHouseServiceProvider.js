"use strict";
import * as PromiseDataWarehouseService from "./PromiseDataWareHouseService.js";

const initializeDataWarehouseJob = () => {
  return PromiseDataWarehouseService.initializeDataWarehouseJob();
};

const restartDataWarehouseJob = (period) => {
  return PromiseDataWarehouseService.restartDataWarehouseJob(period);
};

export { initializeDataWarehouseJob, restartDataWarehouseJob };
