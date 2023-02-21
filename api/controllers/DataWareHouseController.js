import DataWareHouse from "../models/DataWareHouseModel.js";
import {
  restartDataWarehouseJob,
  amountSpentByExplorer,
  explorersByAmountSpent
} from "../services/DataWarehouseServiceProvider.js";

const listIndicators = async (req, res) => {
  try {
    const indicators = await DataWareHouse.find()
      .sort("-computationMoment")
      .exec();
    res.send(indicators);
  } catch (err) {
    res.send(err);
  }
};

const lastIndicator = async (req, res) => {
  try {
    const indicator = await DataWareHouse.find()
      .sort("-computationMoment")
      .limit(1)
      .exec();
    res.send(indicator);
  } catch (err) {
    res.send(err);
  }
};

const rebuildPeriod = (req, res) => {
  console.log("Updating rebuild period. Request: period:" + req.query.rebuildPeriod);
  const period = req.query.rebuildPeriod;
  restartDataWarehouseJob(period);
  res.send(req.query.rebuildPeriod);
};

const amountSpentByExplorerController = async (req, res) => {
  const explorerId = req.body.explorer_id;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;

  const value = await amountSpentByExplorer({
    explorerId,
    startDate,
    endDate
  });

  return res.status(200).send(value);
};

const explorersByAmountSpentController = async (req, res) => {
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const v = req.body.v;
  const theta = req.body.theta;

  const value = await explorersByAmountSpent({
    startDate,
    endDate,
    v,
    theta
  });

  return res.status(200).send(value);
};

export {
  listIndicators,
  lastIndicator,
  rebuildPeriod,
  amountSpentByExplorerController,
  explorersByAmountSpentController
};
