import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  imageData: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.models.images || mongoose.model('images', imageSchema);

export default Image;
