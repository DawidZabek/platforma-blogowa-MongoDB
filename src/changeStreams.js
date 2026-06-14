import Post from './models/post.js';
import Notification from './models/notification.js';
import { sendNotification } from './routes/notifications.js';

const RESTART_DELAY_MS = 5000;

export const watchComments = (resumeToken = null) => {
  const pipeline = [
    { $match: { operationType: 'update' } }
  ];

  const options = resumeToken ? { resumeAfter: resumeToken } : {};
  const changeStream = Post.watch(pipeline, options);

  let lastToken = resumeToken;

  changeStream.on('change', async (change) => {
    lastToken = change._id;
    const updatedFields = change.updateDescription?.updatedFields || {};
    const isAdd = Object.keys(updatedFields).some(k => /^comments\.\d+/.test(k));
    if (!isAdd) return;

    try {
      const post = await Post.findById(change.documentKey._id);
      if (!post) return;

      const notification = await Notification.create({
        user_id: post.author_id,
        post_id: post._id,
        content: `Ktoś skomentował Twój post "${post.content.substring(0, 30)}..."`,
        expireAt: new Date(Date.now() + 15 * 1000),
      });

      sendNotification(notification);
    } catch (err) {
      console.error('Change Stream: błąd przetwarzania zdarzenia:', err);
    }
  });

  let restarting = false;

  const restart = () => {
    if (restarting) return;
    restarting = true;
    setTimeout(() => watchComments(lastToken), RESTART_DELAY_MS);
  };

  changeStream.on('error', (err) => {
    console.error('Change Stream error:', err);
    if (err.code === 40573) return;
    restart();
  });

  changeStream.on('close', () => {
    console.log('Change Stream zamknięty, restartuję...');
    restart();
  });
};
