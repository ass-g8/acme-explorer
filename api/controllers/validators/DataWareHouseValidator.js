import { check } from "express-validator";

const _checkFormatPeriod = async (value, { req }) => {
    const regex = /^M[0-9]{2}$|^Y[0-9]{2}$/;
    if (regex.test(value)) {
        const periodValue = parseInt(value.substring(1, 3));
        if (value[0] === "M"){
            if (0 < periodValue && periodValue <= 36) {
                return Promise.resolve("Period format ok");
            } else {
                return Promise.reject(new Error("Period format not valid"));
            }
        } else if (value[0] === "Y"){
            if (0 < periodValue && periodValue <= 3) {
                return Promise.resolve("Period format ok");
            } else {
                return Promise.reject(new Error("Period format not valid"));
            }
        }
    }
    else {
        return Promise.reject(new Error("Period format not valid"));
    }
}

const cube1Validator = [
    check("period")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape()
        .custom(_checkFormatPeriod),
    check("explorer_id")
        .exists({ checkNull: true, checkFalsy: true })
        .isMongoId()
];

const cube2Validator = [
    check("period")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape()
        .custom(_checkFormatPeriod),
    check("theta")
        .exists({ checkNull: true, checkFalsy: true })
        .isString()
        .trim()
        .escape()
        .isIn(["eq", "ne", "gt", "gte", "lt", "lte"]),
    check("v")
        .exists({ checkNull: true, checkFalsy: true })
        .isNumeric()
];

export { cube1Validator, cube2Validator };