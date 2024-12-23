import mongoose from "mongoose";

const emailTrackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Delivered', 'Opened', 'Clicked', 'Bounced'],
        default: 'Delivered'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const EmailTrack = mongoose.models.emailtracks || mongoose.model("emailtracks", emailTrackSchema);

export default EmailTrack;
