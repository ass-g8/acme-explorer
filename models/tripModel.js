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
        min: 0
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
        type: String
    },
    stages: [stageSchema],
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