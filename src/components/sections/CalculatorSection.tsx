import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CalculatorModal from '@/components/CalculatorModal';

interface CalculatorSectionProps {
  chatsPerMonth: number;
  setChatsPerMonth: (value: number) => void;
  stats: {
    currentLeads: number;
    newLeads: number;
    additionalLeads: number;
    sales: number;
    profit: number;
    profitYear: number;
  };
}

export default function CalculatorSection({ chatsPerMonth, setChatsPerMonth, stats }: CalculatorSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section id="calculator" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">
            Сколько машин продадите дополнительно?
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Реальные данные из кейса автосалона «АвтоХайп»
          </p>
          
          <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 to-white border-2 border-primary/20">
            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">
                Обращений в автосалон в месяц: <span className="text-2xl font-bold text-primary">{chatsPerMonth}</span>
              </label>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={chatsPerMonth}
                onChange={(e) => setChatsPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>100</span>
                <span>500</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="font-medium">Дополнительно заявок</span>
                <span className="text-2xl font-bold text-primary">+{stats.additionalLeads}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <span className="font-medium">Продано машин (конверсия 15%)</span>
                <span className="text-2xl font-bold text-primary">+{stats.sales} авто</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-primary text-white rounded-lg">
                <span className="font-bold text-sm md:text-base">Дополнительная прибыль в месяц</span>
                <span className="text-xl md:text-2xl font-bold">{stats.profit.toLocaleString()} ₽</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-green-600 text-white rounded-lg">
                <span className="font-bold text-sm md:text-base">Дополнительная прибыль в год</span>
                <span className="text-xl md:text-2xl font-bold">{stats.profitYear.toLocaleString()} ₽</span>
              </div>
            </div>
          </Card>

          <div className="text-center">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg mb-4"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).ym) {
                  (window as any).ym(106250852, 'reachGoal', 'calculator_get_pdf_click');
                }
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Icon name="FileText" className="mr-2" size={20} />
              Получить подробный расчёт в PDF
            </Button>
            <p className="text-lg font-semibold text-primary mb-2">
              Окупаемость &lt; 2 недель
            </p>
            <p className="text-muted-foreground">При средней прибыли 50 000 ₽ с одного проданного авто</p>
          </div>
        </div>
      </div>

      <CalculatorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        profit={stats.profit}
      />
    </section>
  );
}