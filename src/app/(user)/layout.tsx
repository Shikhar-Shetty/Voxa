import React from 'react'
import Footer from "@/components/Footer";
import Header from '@/components/Header';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
 return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <hr />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default layout
