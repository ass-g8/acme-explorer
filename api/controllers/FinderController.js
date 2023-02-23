"use strict";
import Finder from "../models/FinderModel.js";
import Configuration from "../models/ConfigurationModel.js";
import { getCachedResults } from "../services/CacheService.js";

export async function addFinder(req, res, next) {
  // Explorer id is the logged user
  const { keyword, minPrice, maxPrice, minDate, maxDate } = req.query;
  const { explorerId } = req.query;
  const newFinder = new Finder({
    keyword: keyword ?? null,
    minPrice: minPrice ?? null,
    maxPrice: maxPrice ?? null,
    minDate: minDate ?? null,
    maxDate: maxDate ?? null,
    explorer_id: explorerId,
  });

  try {
    let lastFinder = await Finder.find({ explorer_id: explorerId })
      .sort("-date")
      .limit(1);
    lastFinder = lastFinder[0];

    const isTheSameFinder = (
      lastFinder.keyword === newFinder.keyword &&
      lastFinder.minPrice === newFinder.minPrice &&
      lastFinder.maxPrice === newFinder.maxPrice &&
      lastFinder.minDate === newFinder.minDate &&
      lastFinder.maxDate === newFinder.maxDate
    );

    const lastFinderDate = new Date(lastFinder.date);
    const configuration = await Configuration.find().limit(1);
    lastFinderDate.setSeconds(lastFinderDate.getSeconds() + configuration[0].cacheLifeTime);
    const cachedFinder = new Date() < lastFinderDate;

    if (isTheSameFinder && cachedFinder) {
      newFinder.date = lastFinder.date;
      await newFinder.save();
      console.log("Accessing cached results...");
      const results = await getCachedResults(explorerId);
      res.send(results);
    } else {
      await newFinder.save();
      next();
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(422).send(err);
    } else {
      res.status(500).send(err);
    }
  }
}
