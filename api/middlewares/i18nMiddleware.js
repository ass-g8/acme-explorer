"use strict";
import Configuration from "../models/ConfigurationModel.js";

const i18nConfiguration = async (req, res, next) => {
  const config = await Configuration.find().limit(1);
  const lang = config[0].defaultLanguage;
  res.setLocale(lang);
  next();
};

export { i18nConfiguration };
