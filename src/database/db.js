import * as SQLite from 'expo-sqlite';

let db = null;

export const getDatabase = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync('contacts.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT,
        email TEXT,
        address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
  return db;
};

export const getAllContacts = async (search = '') => {
  const database = await getDatabase();
  if (search.trim()) {
    return await database.getAllAsync(
      'SELECT * FROM contacts WHERE name LIKE ? OR phone LIKE ? ORDER BY name ASC',
      [`%${search}%`, `%${search}%`]
    );
  }
  return await database.getAllAsync('SELECT * FROM contacts ORDER BY name ASC');
};

export const getContactById = async (id) => {
  const database = await getDatabase();
  return await database.getFirstAsync('SELECT * FROM contacts WHERE id = ?', [id]);
};

export const insertContact = async ({ name, phone, email, address }) => {
  const database = await getDatabase();
  return await database.runAsync(
    'INSERT INTO contacts (name, phone, email, address) VALUES (?, ?, ?, ?)',
    [name, phone || '', email || '', address || '']
  );
};

export const updateContact = async (id, { name, phone, email, address }) => {
  const database = await getDatabase();
  return await database.runAsync(
    'UPDATE contacts SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?',
    [name, phone || '', email || '', address || '', id]
  );
};

export const deleteContact = async (id) => {
  const database = await getDatabase();
  return await database.runAsync('DELETE FROM contacts WHERE id = ?', [id]);
};
