import { useState, useEffect, useMemo, useCallback } from 'react';
import { Meal } from '@/types/meal';
import { Nutrients } from '@/types/nutrients';
import { User } from '@/types/user';
import { Language } from '@/types/language';
import { db } from '@/services/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const useNutrition = (user: User | null, lang: Language) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('Analisando seu dia...');

  const getNutritionAdvice = async (_dailyStats: Nutrients, _goal: string, language: Language) => {
    return language === 'pt' ? 'Continue com o bom trabalho!' : 'Keep up the good work!';
  };

  const analyzeMeal = async (mealDescription: string): Promise<Nutrients> => {
    const base = mealDescription ? mealDescription.length : 0;
    return {
      calories: Math.min(800, Math.max(50, Math.round(base * 1.5))),
      protein: Math.min(80, Math.round(base * 0.2)),
      carbs: Math.min(200, Math.round(base * 0.8)),
      fat: Math.min(70, Math.round(base * 0.3)),
    } as Nutrients;
  };

  useEffect(() => {
    if (!user) {
      setMeals([]);
      return;
    }

    const mealsCol = collection(db, 'users', user.id, 'meals');
    const q = query(mealsCol, orderBy('timestamp', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const docs: Meal[] = [];
      snapshot.forEach(d => {
        const data = d.data() as any;
        docs.push({
          id: d.id,
          description: data.description || '',
          timestamp: data.timestamp || Date.now(),
          nutrients: data.nutrients || { calories: 0, protein: 0, carbs: 0, fat: 0 },
          type: data.type || 'lunch',
        });
      });
      setMeals(docs);
    }, (err) => {
      console.error('[useNutrition] meals listener error:', err);
      setMeals([]);
    });

    return () => unsub();
  }, [user]);

  const todayMeals = useMemo(() => {
    return meals.filter(m => new Date(m.timestamp).toDateString() === new Date().toDateString());
  }, [meals]);

  const dailyTotals = useMemo((): Nutrients => {
    return todayMeals.reduce((acc, m) => ({
      calories: acc.calories + m.nutrients.calories,
      protein: acc.protein + m.nutrients.protein,
      carbs: acc.carbs + m.nutrients.carbs,
      fat: acc.fat + m.nutrients.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [todayMeals]);

  useEffect(() => {
    if (user && todayMeals.length > 0) {
      getNutritionAdvice(dailyTotals, user.goal, lang).then(setAiAdvice);
    } else {
      setAiAdvice(String(lang) === 'pt' ? 'Registe a sua primeira refeição para obter conselhos personalizados!' : 'Register your first meal to get personalized advice!');
    }
  }, [dailyTotals, user, todayMeals.length, lang]);

  const logMeal = useCallback(async (description: string) => {
    if (!description.trim() || !user) return;
    setIsAnalyzing(true);
    try {
      const nutrients = await analyzeMeal(description);
      const mealDoc = {
        description,
        timestamp: Date.now(),
        nutrients,
        type: 'lunch',
        createdAt: serverTimestamp(),
      } as any;

      const ref = await addDoc(collection(db, 'users', user.id, 'meals'), mealDoc);
      const newMeal: Meal = {
        id: ref.id,
        description,
        timestamp: mealDoc.timestamp,
        nutrients,
        type: 'lunch',
      };
      setMeals(prev => [newMeal, ...prev]);
      return newMeal;
    } catch (err) {
      console.error('[useNutrition.logMeal] error:', err);
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, [user]);

  return { 
    meals, 
    todayMeals, 
    dailyTotals, 
    isAnalyzing, 
    aiAdvice, 
    logMeal 
  };
};
