import { check } from "express-validator";
import { isFloat } from "./UtilsValidator.js";

const creationValidator = [
    check("ticker", "Ticker can not be defined")
        .not()
        .exists(),
    check("title")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape(),
    check("description")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape(),
    check("price", "Price can not be defined")
        .not()
        .exists(),
    check("requirements")
        .exists({ checkNull: true, checkFalsy: true })
        .isArray(),
    check("imageCollection")
        .optional()
        .isArray(),
    check("cancelationReason", "Cancelation reason can not be defined")
        .not()
        .exists(),
    check("stages")
        .exists({ checkNull: true, checkFalsy: true })
        .isArray(),
    check("stages.*.title")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape(),
    check("stages.*.description")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape(),
    check("stages.*.price")
        .exists({ checkNull: true, checkFalsy: true })
        .isFloat()
        .custom(isFloat),
    check("sponsorships", "Sponsorships can not be defined")
        .not()
        .exists(),
    check("status", "Status can not be defined")
        .not()
        .exists()
]

export { creationValidator }