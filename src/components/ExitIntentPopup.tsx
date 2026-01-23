import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export default function ExitIntentPopup() {
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

    // Автоматическое появление через 50 секунд
    const autoShowTimer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        
        if (typeof window !== 'undefined' && (window as any).ym) {
          (window as any).ym(106250852, 'reachGoal', 'exit_intent_popup_shown_auto');
          (window as any).ym(106250852, 'reachGoal', `exit_intent_variant_${variant}`);
        }
      }
    }, 50000);

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
    title: 'Попробуйте бота',
    subtitle: 'Пообщайтесь с ИИ-агентом для автосалонов',
    buttonText: 'Открыть бота',
  };

  const variantB = {
    title: 'Попробуйте бота',
    subtitle: 'Пообщайтесь с ИИ-агентом для автосалонов',
    buttonText: 'Открыть бота',
  };

  const content = variant === 'A' ? variantA : variantB;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={handleClose}
      />
      
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 animate-scale-in">
        <div className="bg-white rounded-xl shadow-xl p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <Icon name="X" size={18} className="text-gray-500" />
          </button>

          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name="MessageCircle" size={28} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {content.title}
            </h2>
            <p className="text-sm text-gray-600">
              {content.subtitle}
            </p>
          </div>

          <Button
            onClick={handleBotClick}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            {content.buttonText}
          </Button>
        </div>
      </div>
    </>
  );
}