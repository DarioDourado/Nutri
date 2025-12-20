
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Meal, Nutrients, User, Language } from '../../types';
import { analyzeMeal, getNutritionAdvice } from '../geminiService';

export const useNutrition = (user: User | null, lang: Language) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('Analisando seu dia...');

  useEffect(() => {
    const savedMeals = localStorage.getItem('nutriai_meals');
    if (savedMeals) {
      setMeals(JSON.parse(savedMeals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nutriai_meals', JSON.stringify(meals));
  }, [meals]);

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
      setAiAdvice(lang === 'pt' ? 'Registe a sua primeira refeição para obter conselhos personalizados!' : 'Register your first meal to get personalized advice!');
    }
  }, [dailyTotals, user, todayMeals.length, lang]);

  const logMeal = useCallback(async (description: string) => {
    if (!description.trim()) return;
    setIsAnalyzing(true);
    try {
      const nutrients = await analyzeMeal(description);
      const newMeal: Meal = {
        id: Math.random().toString(36).substr(2, 9),
        description,
        timestamp: Date.now(),
        nutrients,
        type: 'lunch',
      };
      setMeals(prev => [newMeal, ...prev]);
      return newMeal;
    } catch (err) {
      throw err;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return { 
    meals, 
    todayMeals, 
    dailyTotals, 
    isAnalyzing, 
    aiAdvice, 
    logMeal 
  };
};
