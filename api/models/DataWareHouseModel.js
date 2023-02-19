'use strict'
import mongoose from 'mongoose'

const dataWareHouseSchema = new mongoose.Schema({
    trips_managed_by_manager: {},
    applications_per_trip: {},
    trips_price: {},
    ratio_applications_by_status: {}, 
    average_price_range: {},
    top_searched_keywords: {},
    
}, { strict: false })

const model = mongoose.model('DataWareHouse', dataWareHouseSchema)
export const schema = model.schema
export default model