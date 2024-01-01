import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from './navbar';

import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Footer } from './footer';

const inter = Inter({
  subsets: ['latin'],
});

export const RootLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <div className={cn('flex flex-col min-h-screen', inter.className)}>
        <Navbar />
        <div className="flex-1 container">{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
