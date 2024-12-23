import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    isVerified: {
        type: String,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
        default: Date.now,
    },
    profileImage: {
        type: String,
        default: null,
      },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

userSchema.virtual('hasProfileImage').get(function() {
    return this.profileImage !== null;
});

// Ensure virtuals are included in JSON responses
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

const User = mongoose.models.users || mongoose.model
('users', userSchema);

export default User;