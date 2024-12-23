import mongoose from "mongoose";

const phoneTrackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Unknown'],
        default: 'Unknown'
    },
    location: {
        type: String,
        default: 'N/A'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const PhoneTrack = mongoose.models.phonetracks || mongoose.model("phonetracks", phoneTrackSchema);

export default PhoneTrack;
