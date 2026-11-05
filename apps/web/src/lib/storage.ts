import fs from 'fs/promises';
import path from 'path';

export interface QueryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  state?: string;
  queryType: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'contacted';
  emailSent: boolean;
  emailError?: string | null;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'queries.json');

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, '[]', 'utf-8');
    }
  } catch (err) {
    console.error('Failed to ensure data file:', err);
  }
}

export async function getQueries(): Promise<QueryRecord[]> {
  try {
    await ensureDataFile();
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    const data = JSON.parse(content || '[]');
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error reading queries:', error);
    return [];
  }
}

export async function saveQuery(
  input: Omit<QueryRecord, 'id' | 'createdAt' | 'status'>
): Promise<QueryRecord> {
  await ensureDataFile();
  const queries = await getQueries();

  const newRecord: QueryRecord = {
    ...input,
    id: `query_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  queries.unshift(newRecord);

  // Keep last 1000 queries
  const trimmed = queries.slice(0, 1000);
  await fs.writeFile(DATA_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');

  return newRecord;
}

export async function updateQuery(
  id: string,
  updates: Partial<QueryRecord>
): Promise<QueryRecord | null> {
  await ensureDataFile();
  const queries = await getQueries();
  const index = queries.findIndex((q) => q.id === id);

  if (index === -1) return null;

  queries[index] = { ...queries[index], ...updates };
  await fs.writeFile(DATA_FILE, JSON.stringify(queries, null, 2), 'utf-8');
  return queries[index];
}

export async function deleteQuery(id: string): Promise<boolean> {
  await ensureDataFile();
  const queries = await getQueries();
  const filtered = queries.filter((q) => q.id !== id);

  if (filtered.length === queries.length) return false;

  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
