import 'dotenv/config';
import mongoose from 'mongoose';
import { setupDatabase } from './setup.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_app';

const resetDatabase = async () => {
  try {
    console.log('--- Rozpoczynanie RESETU bazy danych ---');

    await mongoose.connect(MONGODB_URI);
    console.log(`Połączono z: ${mongoose.connection.name}`);

    // Drop database - najszybszy sposób na wyczyszczenie wszystkiego (kolekcje i dane)
    console.log('Usuwanie bazy danych...');
    await mongoose.connection.dropDatabase();
    console.log('Baza danych została usunięta.');

    // Ponowne uruchomienie setupu
    await setupDatabase();

    console.log('--- Reset zakończony pomyślnie ---');
  } catch (error) {
    console.error('Błąd podczas resetowania bazy danych:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Połączenie zamknięte.');
  }
};

resetDatabase();
