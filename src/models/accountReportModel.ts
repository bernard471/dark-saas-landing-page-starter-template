import mongoose from "mongoose";

const accountReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    accountId: {
        type: String,
        required: true,
        trim: true
    },
    platform: {
        type: String,
        enum: ['facebook', 'instagram', 'twitter', 'tiktok', 'linkedin'],
        required: true
    },
    evidence: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['Pending', 'Under Review', 'Taken Down', 'Valid Account'],
        default: 'Pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const AccountReport = mongoose.models.accountreports || mongoose.model("accountreports", accountReportSchema);
export default AccountReport;
