import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface ExitIntentPopupProps {
  onOpenChat: () => void;
}

export default function ExitIntentPopup({ onOpenChat }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [phone, setPhone] = useState('');
  const [variant] = useState(() => Math.random() > 0.5 ? 'A' : 'B');

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return;
      
      if (e.clientY <= 0) {
        setIsVisible(true);
        setHasShown(true);
        
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106250852, 'reachGoal', 'exit_intent_popup_shown');
          (window as any).ym(106250852, 'reachGoal', `exit_intent_variant_${variant}`);
        }
      }
    };

    // Автоматическое появление через 55 секунд
    const autoShowTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106250852, 'reachGoal', 'exit_intent_popup_shown_auto');
          (window as any).ym(106250852, 'reachGoal', `exit_intent_variant_${variant}`);
        }
      }
    }, 55000);

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(autoShowTimer);
    };
  }, [hasShown, variant]);

  const handleClose = () => {
    setIsVisible(false);
    
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(106250852, 'reachGoal', 'exit_intent_popup_closed');
    }
  };

  const handleBotClick = () => {
    if (typeof window !== 'undefined' && (window as any).ym) {
      (window as any).ym(106250852, 'reachGoal', 'exit_intent_bot_click');
    }
    window.open('https://t.me/khurmapro_bot', '_blank');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const variantA = {
    title: '🤖 Протестируйте бота сами!',
    subtitle: 'Пообщайтесь с ИИ-агентом для автосалонов и убедитесь в его эффективности. Это займёт всего 2 минуты.',
    buttonText: 'Пообщаться с ботом',
  };

  const variantB = {
    title: '🤖 Протестируйте бота сами!',
    subtitle: 'Пообщайтесь с ИИ-агентом для автосалонов и убедитесь в его эффективности. Это займёт всего 2 минуты.',
    buttonText: 'Пообщаться с ботом',
  };

  const content = variant === 'A' ? variantA : variantB;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 animate-scale-in">
        <div className="bg-white rounded-2xl shadow-2xl p-8 relative border-4 border-red-500">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-full transition-colors"
          >
            <Icon name="X" size={20} className="text-slate-600" />
          </button>

          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Icon name="AlertTriangle" size={40} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              {content.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleBotClick}
              size="lg"
              className="w-full py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              <Icon name="MessageCircle" size={20} />
              {content.buttonText}
            </Button>
          </div>

          <div className="mt-6 space-y-2">
            <p className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              Работает 24/7 без выходных
            </p>
            <p className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              Отвечает за 10 секунд
            </p>
            <p className="text-sm text-center text-muted-foreground flex items-center justify-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              Рост лидов на 40-50%
            </p>
          </div>
        </div>
      </div>
    </>
  );
}