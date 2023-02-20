'use strict'
import mongoose from 'mongoose'

const dataWareHouseSchema = new mongoose.Schema({
    tripsManagedByManager: {},
    applicationsPerTrip: {},
    tripsPrice: {},
    ratioApplicationsByStatus: {}, 
    averagePriceRange: {},
    topSearchedKeywords: {}
}, { strict: false })

const model = mongoose.model('DataWareHouse', dataWareHouseSchema)
export const schema = model.schema
export default model