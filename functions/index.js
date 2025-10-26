// functions/index.js (ESM, Node 22, Firebase Functions v2)
import {onRequest} from 'firebase-functions/v2/https';
import {logger} from 'firebase-functions';
import {initializeApp, getApps} from 'firebase-admin/app';
import {getFirestore, FieldValue} from 'firebase-admin/firestore';

const app = getApps().length ? getApps()[0] : initializeApp();
const db = getFirestore(app);

export const countBooks = onRequest({cors: true, region: 'us-central1'}, async (_req, res) => {
  try {
    const snap = await db.collection('books').get();
    res.json({count: snap.size});
  } catch (err) {
    logger.error(err);
    res.status(500).json({error: String(err)});
  }
});

export const addBook = onRequest({cors: true, region: 'us-central1'}, async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({error: 'Use POST'});
    }

    const {title, author, year} = req.body || {};
    if (!title || !author || year === undefined || year === null || year === '') {
      return res.status(400).json({error: 'title, author, year are required'});
    }

    const payload = {
      title: String(title).toUpperCase().trim(),
      author: String(author).toUpperCase().trim(),
      year: Number(year),
      createdAt: FieldValue.serverTimestamp(),
    };

    if (!Number.isFinite(payload.year)) {
      return res.status(400).json({error: 'year must be a number'});
    }

    const docRef = await db.collection('books').add(payload);
    res.json({ok: true, id: docRef.id, title: payload.title, author: payload.author, year: payload.year});
  } catch (err) {
    logger.error(err);
    res.status(500).json({error: String(err)});
  }
});

export const getAllBooks = onRequest({cors: true, region: 'us-central1'}, async (_req, res) => {
  try {
    const snap = await db.collection('books').orderBy('createdAt', 'desc').get();
    const items = snap.docs.map((d) => ({id: d.id, ...d.data()}));
    res.json({items, count: items.length});
  } catch (err) {
    logger.error(err);
    res.status(500).json({error: String(err)});
  }
});
