
import { Page } from '@/types/page';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface NavigationContextType {
  pathname: string;
  push: (href: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState('/');

  const push = useCallback((href: string) => {
    setPathname(href);
    window.scrollTo(0, 0);
  }, []);

  return (
    <NavigationContext.Provider value={{ pathname, push }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("useRouter must be used within NavigationProvider");
  return {
    push: context.push,
    back: () => console.log("Back navigation"),
    prefetch: () => {}
  };
};

export const usePathname = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error("usePathname must be used within NavigationProvider");
  return context.pathname;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className, ...props }) => {
  const { push } = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    push(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

// Helper to map route string to Page enum
export const routeToPage = (route: string): Page => {
  switch (route) {
    case '/': return Page.LANDING;
    case '/dashboard': return Page.DASHBOARD;
    case '/profile': return Page.PROFILE;
    case '/plans': return Page.PLANS;
    case '/login': return Page.LOGIN;
    case '/contact': return Page.CONTACT;
    default: return Page.LANDING;
  }
};
