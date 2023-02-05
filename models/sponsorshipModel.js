
const sponsorshipSchema = new mongoose.Schema({
    banner: {
        data: Buffer,
        contentType: String,
        required: 'Sponsorship banner required'
    },
    landingPage: {
        type: String,
        required: 'Sponsorship landing page required'
    },
    amount: {
        type: Number,
        required: 'Sponsorship amount required',
        min: 0
    },
    status: {
        type: String,
        required: 'Sponsorship status required',
        enum: ['PENDING', 'ACCEPTED', 'CANCELLED'],
        default: 'PENDING'
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: 'Sponsorship trip required'
    },
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Sponsorship sponsor required'
    }
}, { strict: false })