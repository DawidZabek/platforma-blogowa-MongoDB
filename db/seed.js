import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/user.js';
import Post from '../src/models/post.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app';

const usersData = [
  { name: 'janusz_mongol', password: 'password123' },
  { name: 'grazyna_code', password: 'password123' },
  { name: 'pablo_escoblog', password: 'password123' },
  { name: 'stefan_js', password: 'password123' },
  { name: 'ania_nodowiec', password: 'password123' }
];

const tagsPool = ['javascript', 'mongodb', 'webdev', 'backend', 'express', 'node', 'nosql', 'active-record', 'database', 'coding'];
const commentsPool = [
  'Super wpis!',
  'Dzięki za info, przydało się.',
  'Nie zgadzam się z Tobą w sekcji o bazach.',
  'Twoja stara to kopara napisała komentarz! - żartuję, super artykuł.',
  'Możesz napisać o tym coś więcej?',
  'Ciekawa perspektywa.',
  'Właśnie tego szukałem.',
  'Wszystko jasne, dzięki!',
  'A co z wydajnością w tym przypadku?',
  'To jest totalny sztos!'
];

const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const seedDatabase = async () => {
  try {
    console.log('--- Rozpoczynanie SEEDOWANIA bazy danych ---');

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
      console.log(`Połączono z: ${mongoose.connection.name}`);
    }

    console.log('Czyszczenie kolekcji...');
    await User.deleteMany({});
    await Post.deleteMany({});

    console.log('Tworzenie użytkowników...');
    const createdUsers = await User.create(usersData);
    console.log(`Utworzono ${createdUsers.length} użytkowników.`);

    console.log('Tworzenie postów...');
    const postsPromises = Array.from({ length: 15 }).map(async (_, index) => {
      const author = getRandomElement(createdUsers);
      const postTags = Array.from({ length: getRandomInt(1, 4) })
        .map(() => getRandomElement(tagsPool))
        .filter((v, i, a) => a.indexOf(v) === i);

      const commentsCount = getRandomInt(1, 10);
      const postComments = Array.from({ length: commentsCount }).map(() => {
        const commentAuthor = getRandomElement(createdUsers);
        return {
          author_id: commentAuthor._id,
          content: getRandomElement(commentsPool),
          createdAt: new Date()
        };
      });

      return Post.create({
        content: `To jest treść posta numer ${index + 1}. MongoDB jest naprawdę potężnym narzędziem.`,
        tags: postTags,
        author_id: author._id,
        comments: postComments,
        stats: {
          views: getRandomInt(10, 5000),
          likes: getRandomInt(0, 500)
        }
      });
    });

    await Promise.all(postsPromises);
    console.log('Utworzono 15 postów z komentarzami.');
    console.log('--- Seedowanie zakończone pomyślnie ---');
  } catch (error) {
    console.error('Błąd podczas seedowania bazy danych:', error.message);
    throw error;
  }
};

if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .then(() => mongoose.connection.close())
    .catch(() => process.exit(1));
}
