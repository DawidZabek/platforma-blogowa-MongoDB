import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: true });

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  comments: [commentSchema],
  stats: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

postSchema.index({ tags: 1 });

postSchema.statics.findByTag = (tag) => {
  return mongoose.model('Post').find({ tags: tag.toLowerCase() });
};

postSchema.methods.addComment = function (authorId, content) {
  this.comments.push({ author_id: authorId, content: content });
  return this.save();
};

const Post = mongoose.model('Post', postSchema);

export default Post;
