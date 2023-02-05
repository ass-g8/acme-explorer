
const finderSchema = new mongoose.Schema({
    keyword: {
        type: String,
    },
    minPrice: {
        type: Number,
        min: 0
    },
    maxPrice: {
        type: Number,
        min: 0
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    explorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Finder explorer required'
    },
}, { strict: false })