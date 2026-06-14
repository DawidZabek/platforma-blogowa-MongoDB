import Post from './models/post.js';
import Notification from './models/notification.js';
import { sendNotification } from './routes/notifications.js';

const RESTART_DELAY_MS = 5000;

export const watchComments = (resumeToken = null) => {
  const pipeline = [
    { $match: { operationType: 'update', 'updateDescription.updatedFields.comments': { $exists: true } } }
  ];

  const options = resumeToken ? { resumeAfter: resumeToken } : {};
  const changeStream = Post.watch(pipeline, options);

  changeStream.on('change', async (change) => {
    const token = change._id;
    try {
      const post = await Post.findById(change.documentKey._id);
      if (!post) return;

      const notification = await Notification.create({
        user_id: post.author_id,
        post_id: post._id,
        content: `Ktoś skomentował Twój post "${post.content.substring(0, 30)}..."`,
        expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      sendNotification(notification);
    } catch (err) {
      console.error('Change Stream: błąd przetwarzania zdarzenia:', err);
    }
  });

  changeStream.on('error', (err) => {
    console.error('Change Stream error:', err);
    changeStream.close();
    if (err.code === 40573) return;
    setTimeout(() => watchComments(resumeToken), RESTART_DELAY_MS);
  });

  changeStream.on('close', () => {
    console.log('Change Stream zamknięty, restartuję...');
    setTimeout(() => watchComments(resumeToken), RESTART_DELAY_MS);
  });
};
