import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { Meal } from '@/types/meal';

export const getMeals = async (uid: string): Promise<Meal[]> => {
  const q = query(collection(db, 'users', uid, 'meals'), orderBy('timestamp', 'desc'));
  const snap = await getDocs(q);
  const docs: Meal[] = [];
  snap.forEach((d) => {
    const data = d.data() as any;
    docs.push({
      id: d.id,
      description: data.description ?? '',
      timestamp: data.timestamp ?? Date.now(),
      nutrients: data.nutrients ?? { calories: 0, protein: 0, carbs: 0, fat: 0 },
      type: data.type ?? 'lunch',
    });
  });
  return docs;
};

export const addMeal = async (uid: string, data: Partial<Meal>): Promise<Meal> => {
  const mealsCol = collection(db, 'users', uid, 'meals');
  const mealDoc = {
    description: data.description ?? '',
    timestamp: data.timestamp ?? Date.now(),
    nutrients: data.nutrients ?? { calories: 0, protein: 0, carbs: 0, fat: 0 },
    type: data.type ?? 'lunch',
    createdAt: serverTimestamp(),
  } as any;
  const ref = await addDoc(mealsCol, mealDoc);
  return { id: ref.id, ...mealDoc } as Meal;
};

export default { getMeals, addMeal };
