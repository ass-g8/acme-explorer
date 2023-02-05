'use strict'
import mongoose from 'mongoose'
import dateFormat from 'dateformat'
import { customAlphabet } from 'nanoid'
import { schema as sponsorshipSchema } from './sponsorshipModel.js'
import { schema as stageSchema } from './stageModel.js'
const idGenerator = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 4)


const tripSchema = new mongoose.Schema({
    ticker: {
        type: String,
        unique: true,
        required: 'Trip ticker required',
        validate: {
            validator: function (v) {
                return /\d{6}-\w{4}/.test(v)
            },
            message: 'ticker is not valid!, Pattern("YYMMDD-XXXX")'
        }
    },
    title: {
        type: String,
        required: 'Trip title required'
    },
    description: {
        type: String,
        required: 'Trip description required'
    },
    price: {
        type: Number,
        min: 0.0
    },
    requirements: {
        type: [String],
        required: 'Trip requirements required'
    },
    startDate: {
        type: Date,
        required: 'Trip start date required',
    },
    endDate: {
        type: Date,
        required: 'Trip end date required',
    },
    imageCollection: [
        {
            data: Buffer,
            contentType: String
        }
    ],
    cancelationReason: {
        type: String,
        default: null
    },
    stages: [stageSchema],
    sponsorships: [sponsorshipSchema],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Trip manager required'
    },
    status: {
        type: String,
        enum: ['DRAFT', 'PUBLISHED', 'CANCELLED'],
        default: 'DRAFT'
    }
}, { strict: false })


tripSchema.pre('save', function (callback) {
    const newTrip = this
    const day = dateFormat(new Date(), 'yymmdd')

    const generatedTicker = [day, idGenerator()].join('-')
    newTrip.ticker = generatedTicker
    newTrip.price = newTrip.stages.reduce((acc, stage) => acc + stage.price, 0)

    callback()
})

const model = mongoose.model('Trip', tripSchema)

export const schema = model.schema
export default model
