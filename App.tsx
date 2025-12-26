
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './app/page';
import LoginPage from './app/login/page';
import DashboardPage from './app/dashboard/page';
import ProfilePage from './app/profile/page';
import PlansPage from './app/plans/page';
import ContactPage from './app/contact/page';
import { useAuth } from './services/hooks/useAuth';
import { useNutrition } from './services/hooks/useNutrition';
import { useTranslation } from './services/hooks/useTranslation';
import { NavigationProvider, usePathname, useRouter } from './services/navigation';

const AppContent: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, changeLanguage, t } = useTranslation();
  
  const { 
    user, 
    login, 
    logout, 
    updateUser, 
    isLoading, 
    isAuthenticating, 
    authError 
  } = useAuth(() => {
    router.push('/dashboard');
  });

  const { todayMeals, dailyTotals, isAnalyzing, aiAdvice, logMeal } = useNutrition(user, lang);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="relative">
             <div className="h-16 w-16 bg-emerald-500 rounded-2xl animate-spin-slow"></div>
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="h-8 w-8 bg-white rounded-full"></div>
             </div>
          </div>
          <p className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-xs animate-pulse">Carregando NutriAi...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (pathname) {
      case '/': 
        return <HomePage t={t} />;
      case '/login': 
        return <LoginPage login={login} isAuthenticating={isAuthenticating} authError={authError} t={t} />;
      case '/dashboard':
        return user ? (
          <DashboardPage 
            user={user} todayMeals={todayMeals} dailyTotals={dailyTotals}
            isAnalyzing={isAnalyzing} aiAdvice={aiAdvice} onLogMeal={logMeal}
            lang={lang} t={t}
          />
        ) : <LoginPage login={login} isAuthenticating={isAuthenticating} authError={authError} t={t} />;
      case '/profile':
        return user ? <ProfilePage user={user} onUpdateUser={updateUser} t={t} /> : <LoginPage login={login} isAuthenticating={isAuthenticating} authError={authError} t={t} />;
      case '/plans':
        return <PlansPage t={t} />;
      case '/contact':
        return <ContactPage t={t} />;
      default:
        return <HomePage t={t} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        user={user} 
        onLogout={logout} 
        lang={lang} 
        onLangChange={changeLanguage} 
        t={t} 
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer t={t} />
    </div>
  );
};

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}
