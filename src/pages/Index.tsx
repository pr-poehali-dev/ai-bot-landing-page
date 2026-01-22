import { useState } from 'react';
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ResultsSection from '@/components/sections/ResultsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import CalculatorSection from '@/components/sections/CalculatorSection';
import PricingSection from '@/components/sections/PricingSection';
import ContactForm from '@/components/ContactForm';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

export default function Index() {
  const [chatsPerMonth, setChatsPerMonth] = useState(180);

  const calculateProfit = () => {
    const withoutBotRate = 170 / 180;
    const withBotRate = 260 / 180;
    const currentLeads = Math.round(chatsPerMonth * withoutBotRate);
    const newLeads = Math.round(chatsPerMonth * withBotRate);
    const additionalLeads = newLeads - currentLeads;
    const sales = Math.round(additionalLeads * 0.15);
    const profit = sales * 50000;
    return { currentLeads, newLeads, additionalLeads, sales, profit };
  };

  const stats = calculateProfit();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection />
      
      <ProblemsSection />
      
      <FeaturesSection />
      
      <ResultsSection />
      
      <TestimonialsSection />
      
      <ComparisonSection />
      
      <CalculatorSection 
        chatsPerMonth={chatsPerMonth} 
        setChatsPerMonth={setChatsPerMonth} 
        stats={stats} 
      />
      
      <PricingSection />
      
      <section id="callback-form" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Узнайте, нужен ли вам ИИ-агент
            </h2>
            <p className="text-lg text-muted-foreground">
              Проведу бесплатный аудит вашего автосалона и расскажу о возможностях ИИ-агента именно для вашего бизнеса
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      
      <CTASection />
      
      <Footer />
    </div>
  );
}
