import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  readAt: {
    type: Date,
    default: null
  },
  expireAt: {
    type: Date,
    index: { expires: 0 }
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

notificationSchema.statics.findUnreadForUser = (userId) => {
  return mongoose.model('Notification').find({ user_id: userId, readAt: null }).sort({ createdAt: -1 });
};

notificationSchema.methods.markAsRead = function () {
  this.readAt = new Date();
  return this.save();
};

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
