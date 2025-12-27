import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
const mockPath = path.resolve(process.cwd(), 'services/transporter/mockData.json');
if (!fs.existsSync(mockPath)) {
  console.error('Mock data file not found:', mockPath);
  process.exit(1);
}
const MOCK_MEALS: any[] = JSON.parse(fs.readFileSync(mockPath, 'utf8'));

dotenv.config({ path: path.resolve(process.cwd(), 'api/.env') });
dotenv.config();

const svcPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!svcPath || !fs.existsSync(svcPath)) {
  console.error('GOOGLE_APPLICATION_CREDENTIALS not set or file not found. Check api/.env');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(svcPath), 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

type UserSeed = {
  name: string;
  email: string;
  weight: number;
  height: number;
  goal: 'lose' | 'gain' | 'maintain';
  dailyCalorieTarget: number;
  password: string;
};

const USERS: UserSeed[] = [
  {
    name: 'Dário',
    email: 'dario@example.com',
    weight: 75,
    height: 180,
    goal: 'maintain',
    dailyCalorieTarget: 2500,
    password: 'secret123'
  },
  {
    name: 'Alice Silva',
    email: 'alice@example.com',
    weight: 65,
    height: 165,
    goal: 'lose',
    dailyCalorieTarget: 1800,
    password: 'alice123'
  },
  {
    name: 'João Pereira',
    email: 'joao@example.com',
    weight: 85,
    height: 185,
    goal: 'gain',
    dailyCalorieTarget: 3000,
    password: 'joao123'
  }
];

async function up() {
  console.log('Starting migration: up');
  for (const u of USERS) {
    try {
      const userRecord = await admin.auth().createUser({
        email: u.email,
        password: u.password,
        displayName: u.name
      });
      
      console.log('✓ Created Auth user:', userRecord.uid, u.email);
      
      const userDoc = {
        id: userRecord.uid,
        email: u.email,
        name: u.name,
        weight: u.weight,
        height: u.height,
        goal: u.goal,
        dailyCalorieTarget: u.dailyCalorieTarget
      };
      
      await db.collection('users').doc(userRecord.uid).set(userDoc);
      console.log('✓ Created Firestore profile for:', u.email);
    } catch (err: any) {
      if (err.code === 'auth/email-already-exists') {
        console.log('⚠ User already exists, updating profile:', u.email);
        const existingUser = await admin.auth().getUserByEmail(u.email);
        const userDoc = {
          id: existingUser.uid,
          email: u.email,
          name: u.name,
          weight: u.weight,
          height: u.height,
          goal: u.goal,
          dailyCalorieTarget: u.dailyCalorieTarget
        };
        await db.collection('users').doc(existingUser.uid).set(userDoc);
        console.log('✓ Updated Firestore profile for:', u.email);
      } else {
        console.error('✗ Error creating user:', u.email, err.message);
      }
    }
  }
  console.log('Migration up finished.');
}

async function upMeals() {
  console.log('Starting migration: upMeals (mock -> Firestore)');
  for (const u of USERS) {
    try {
      const userRecord = await admin.auth().getUserByEmail(u.email);
      const uid = userRecord.uid;
      const batch = db.batch();
      for (let i = 0; i < MOCK_MEALS.length; i++) {
        const m = MOCK_MEALS[i];
        const ref = db.collection('users').doc(uid).collection('meals').doc(m.id || undefined);
        const ts = m.timestamp && m.timestamp > 0 ? m.timestamp : Date.now() - (i === 0 ? 1000 * 60 * 60 : 1000 * 60 * 60 * 5);
        const docData: any = {
          id: m.id,
          description: m.description,
          timestamp: ts,
          nutrients: m.nutrients,
          type: m.type,
          migratedFromMock: true,
          migratedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        batch.set(ref, docData, { merge: true });
      }
      await batch.commit();
      console.log(`✓ Migrated ${MOCK_MEALS.length} meals for user ${u.email} (uid=${uid})`);
    } catch (err: any) {
      console.error(`✗ Failed to migrate meals for ${u.email}:`, err.message || err);
    }
  }
  console.log('Migration upMeals finished.');
}

async function down() {
  console.log('Starting migration: down');
  for (const u of USERS) {
    try {
      const userRecord = await admin.auth().getUserByEmail(u.email);
      await admin.auth().deleteUser(userRecord.uid);
      await db.collection('users').doc(userRecord.uid).delete();
      console.log('✓ Deleted user:', u.email);
    } catch (err: any) {
      console.warn('⚠ Could not delete user:', u.email, err.message);
    }
  }
  console.log('Migration down finished.');
}

async function downMeals() {
  console.log('Starting migration: downMeals (remove migrated mock meals)');
  for (const u of USERS) {
    try {
      const userRecord = await admin.auth().getUserByEmail(u.email);
      const uid = userRecord.uid;
      const mealsRef = db.collection('users').doc(uid).collection('meals');
      const snap = await mealsRef.where('migratedFromMock', '==', true).get();
      if (snap.empty) {
        console.log(`⚠ No migrated meals found for ${u.email}`);
        continue;
      }
      const batch = db.batch();
      snap.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      console.log(`✓ Removed ${snap.size} migrated meals for ${u.email}`);
    } catch (err: any) {
      console.error(`✗ Failed to remove migrated meals for ${u.email}:`, err.message || err);
    }
  }
  console.log('Migration downMeals finished.');
}

async function main() {
  const action = process.argv[2] || 'up';
  const entity = process.argv[3] || 'users';
  try {
    if (action === 'up') {
      if (entity === 'users') await up();
      else if (entity === 'meals') await upMeals();
      else if (entity === 'all') { await up(); await upMeals(); }
      else console.error('Unknown entity. Use "users", "meals" or "all".');
    } else if (action === 'down') {
      if (entity === 'users') await down();
      else if (entity === 'meals') await downMeals();
      else if (entity === 'all') { await downMeals(); await down(); }
      else console.error('Unknown entity. Use "users", "meals" or "all".');
    } else console.error('Unknown action. Use "up" or "down".');
  } catch (err) {
    console.error('Migration error:', err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

main();