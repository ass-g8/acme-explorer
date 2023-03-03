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

const changeSponsorshipStatusValidator = [
    check("status")
        .exists({ checkNull: true, checkFalsy: true })
        .withMessage("Status is required")
        .isIn(['ACCEPTED', 'CANCELLED'])
        .withMessage("Status does contain invalid value")
]

export { creationSponsorshipValidator, updateSponsorshipValidator, changeSponsorshipStatusValidator };