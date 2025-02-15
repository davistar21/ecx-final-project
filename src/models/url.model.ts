import mongoose from "mongoose"

const UrlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  originalUrl: {
    type: String,
    required: [true, 'No URL provided!']
  },
  shortUrl: {
    type: String,
    required: [true, 'No short URL']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }, 
  isValid: {
    type: Boolean,
    default: true
  }
})

const UrlModel = mongoose.model('Url', UrlSchema);
export default UrlModel