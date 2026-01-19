import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profit: number;
}

export default function CalculatorModal({ isOpen, onClose, profit }: CalculatorModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Отправка в Яндекс.Метрику
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(106250852, 'reachGoal', 'calculator_form_submit');
    }

    // Симуляция отправки
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert(`Спасибо, ${name}! Отправим PDF с расчётом на WhatsApp: ${phone}`);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            🎉 Ваш расчёт готов!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <p className="text-lg text-muted-foreground mb-2">
            Вы можете зарабатывать дополнительно
          </p>
          <p className="text-4xl font-bold text-primary mb-2">
            +{profit.toLocaleString()} ₽/мес
          </p>
          <p className="text-sm text-muted-foreground">
            с AI-ботом для автосалона
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-center">
            📄 Отправим <span className="font-bold">подробный PDF-отчёт</span> с расчётом прибыли и планом внедрения прямо в WhatsApp
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Ваше имя *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Телефон (WhatsApp) *</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 999 123 45 67"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email (опционально)</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ivan@example.com"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" className="animate-spin mr-2" size={20} />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" className="mr-2" size={20} />
                Получить PDF в WhatsApp
              </>
            )}
          </Button>

          <p className="text-center text-xs text-red-600 font-semibold flex items-center justify-center gap-1">
            <Icon name="Clock" size={14} />
            Предложение действует до конца месяца — осталось 6 мест
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
