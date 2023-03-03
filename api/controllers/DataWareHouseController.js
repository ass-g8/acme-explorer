import { PDFDocument } from "pdf-lib";
import * as fs from "fs";
import DataWareHouse from "../models/DataWareHouseModel.js";
import {
  restartDataWarehouseJob,
  amountSpentByExplorer,
  explorersByAmountSpent
} from "../services/DataWarehouseServiceProvider.js";
import {resolve} from 'path';


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

const lastIndicator = async (req, res, next) => {
  const type = req.query.type;
  try {
    const indicator = await DataWareHouse.find()
      .sort("-computationMoment")
      .limit(1)
      .exec();
    if (type === "pdf") {
      req.indicator = indicator;
      next();
    } else {
      res.send(indicator);
    }
  } catch (err) {
    res.send(err);
  }
};

const getRatioApplicationsByStatus = async (indicator) => {
  const labels = []; const data = [];
  indicator[0].ratioApplicationsByStatus.forEach(dict => {
    labels.push(dict._id);
    data.push(dict.applications);
  });
  const response = await fetch("https://quickchart.io/chart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "version": "2",
      "backgroundColor": "transparent",
      "width": 500,
      "height": 300,
      "devicePixelRatio": 1.0,
      "format": "png",
      "chart": {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: "Ratio applications by status",
            data
          }]
        }
      }
    }),
  });
  const getBuffer = await response.arrayBuffer();
  return getBuffer;
}

const getTopSearchedKeyWords = async (indicator) => {
  const labels = []; const data = [];
  indicator[0].topSearchedKeywords.forEach(dict => {
    labels.push(dict._id);
    data.push(dict.totalSearch);
  });
  const response = await fetch("https://quickchart.io/chart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "version": "2",
      "backgroundColor": "transparent",
      "width": 500,
      "height": 300,
      "devicePixelRatio": 1.0,
      "format": "png",
      "chart": {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: "Top searched keywords",
            data
          }]
        }
      }
    }),
  });
  const getBuffer = await response.arrayBuffer();
  return getBuffer;
}

const generateReport = async (req, res) => {
  const indicator = req.indicator;
  const ratioChart = await getRatioApplicationsByStatus(indicator);
  const barChart = await getTopSearchedKeyWords(indicator);
  const pdf = await buildPdf({ indicator, ratioChart, barChart });
};

const buildPdf = async ({ indicator, ratioChart, barChart }) => {
  const pdfPath = resolve('./assets/plantilla.pdf')
  const pdfDoc = await PDFDocument.load(fs.readFileSync(pdfPath));
  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();
  const ratioChartPng = await pdfDoc.embedPng(ratioChart);
  const barChartPng = await pdfDoc.embedPng(barChart);

  page.drawImage(ratioChartPng, {
    x: 100,
    y: 100
  });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync("output.pdf", pdfBytes);
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
  generateReport,
  rebuildPeriod,
  amountSpentByExplorerController,
  explorersByAmountSpentController
};
