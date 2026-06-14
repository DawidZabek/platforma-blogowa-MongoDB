import { Router } from 'express';
import Notification from '../models/notification.js';

const router = Router();

const clients = new Set();

export const sendNotification = (notification) => {
  for (const client of clients) {
    client.res.write(`data: ${JSON.stringify(notification)}\n\n`);
  }
};

router.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const client = { id: Date.now(), res };
  clients.add(client);

  req.on('close', () => clients.delete(client));
});

router.get('/', async (req, res) => {
  const notifications = await Notification.find({ readAt: null }).sort({ createdAt: -1 });
  res.json(notifications);
});

router.get('/:userId', async (req, res) => {
  const notifications = await Notification.findUnreadForUser(req.params.userId);
  res.json(notifications);
});

export default router;
