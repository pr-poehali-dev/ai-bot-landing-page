import { useEffect } from 'react';

export default function SuvvyChat() {
  useEffect(() => {
    // Загружаем скрипт Suvvy
    const script = document.createElement('script');
    script.src = 'https://app.suvvy.ai/widget.js';
    script.async = true;
    script.onload = () => {
      // Инициализируем виджет после загрузки
      if (window.suvvy) {
        window.suvvy('init', { 
          token: 'cc-709dd41583548ddfa01550252bdfd452e4ca0b4182b60c3d341411e59ac58ea3' 
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Очищаем при размонтировании
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

// Добавляем типы для TypeScript
declare global {
  interface Window {
    suvvy: (command: string, options?: any) => void;
  }
}
