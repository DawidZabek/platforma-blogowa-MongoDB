import Post from './models/post.js';
import Notification from './models/notification.js';
import { sendNotification } from './routes/notifications.js';

export const watchComments = () => {
  const pipeline = [
    { $match: { operationType: 'update', 'updateDescription.updatedFields.comments': { $exists: true } } }
  ];

  const changeStream = Post.watch(pipeline);

  changeStream.on('change', async (change) => {
    const post = await Post.findById(change.documentKey._id);
    if (!post) return;

    const notification = await Notification.create({
      user_id: post.author_id,
      post_id: post._id,
      content: `Ktoś skomentował Twój post "${post.content.substring(0, 30)}..."`,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    sendNotification(notification);
  });

  changeStream.on('error', (err) => {
    console.error('Change Stream error:', err);
  });
};
