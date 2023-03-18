import { check } from "express-validator";

const creationSponsorshipValidator = [
    check("banner")
        .optional(),
    check("landingPage")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Landing page is required")
        .isString()
        .isURL()
        .withMessage("Landing page must be an URL")
        .trim()
        .escape(),
    check("amount")
        .not()
        .exists(),
    check("status")
        .not()
        .exists(),
    check("sponsor_id")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Sponsor id required")
        .isMongoId()
]

const updateSponsorshipValidator = [
    check("banner")
        .optional(),
    check("landingPage")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Landing page is required")
        .isString()
        .isURL()
        .withMessage("Landing page must be an URL")
        .trim()
        .escape(),
    check("amount")
        .not()
        .exists(),
    check("status")
        .not()
        .exists(),
    check("sponsor_id")
        .not()
        .exists()
]

export { creationSponsorshipValidator, updateSponsorshipValidator };