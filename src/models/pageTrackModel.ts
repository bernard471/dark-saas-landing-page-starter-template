import mongoose from "mongoose";

const pageTrackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Fake', 'Legitimate', 'Under Investigation'],
        default: 'Under Investigation'
    },
    detectedDate: {
        type: Date,
        default: Date.now
    },
    threatLevel: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    }
}, { timestamps: true });

const PageTrack = mongoose.models.pagetracks || mongoose.model("pagetracks", pageTrackSchema);

export default PageTrack;
