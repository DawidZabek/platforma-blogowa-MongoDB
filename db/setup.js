import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/user.js';
import Post from '../src/models/post.js';
import Notification from '../src/models/notification.js';
import { seedDatabase } from './seed.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app';

export const setupDatabase = async () => {
  try {
    console.log('--- Rozpoczynanie konfiguracji bazy danych (ESM + Arrow) ---');
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log(`Połączono z MongoDB: ${mongoose.connection.name}`);
    }

    console.log('Inicjalizacja modeli...');
    await Promise.all([
      User.init(),
      Post.init(),
      Notification.init()
    ]);

    console.log('Synchronizacja indeksów...');
    await Promise.all([
      User.syncIndexes(),
      Post.syncIndexes(),
      Notification.syncIndexes()
    ]);

    console.log('Sukces: Wszystkie kolekcje i indeksy zostały skonfigurowane.');
    
    // Uruchomienie seedowania po setupie
    await seedDatabase();
    
  } catch (error) {
    console.error('Błąd podczas konfiguracji bazy danych:', error.message);
    throw error;
  }
};

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.endsWith('setup.js')) {
  setupDatabase()
    .then(() => mongoose.connection.close())
    .catch(() => process.exit(1));
}
