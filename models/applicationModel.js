const applicationSchema = new mongoose.Schema({
    requestDate: {
        type: Date,
        required: 'Application request date required',
        default: Date.now
    },
    status: {
        type: String,
        required: 'Application status required',
        enum: ['PENDING', 'DUE', 'ACCEPTED', 'REJECTED', 'CANCELLED'],
        default: 'PENDING'
    },
    comment: {
        type: String
    },
    rejectedReason: {
        type: String
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: 'Application trip required'
    },
    explorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Application explorer required'
    },
}, { strict: false })