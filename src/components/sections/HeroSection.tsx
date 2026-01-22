import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import VideoUploader from '@/components/VideoUploader';

export default function HeroSection() {
  const [videoUrl, setVideoUrl] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center animate-fade-in mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Icon name="Car" size={16} />
              <span>Для автосалонов • Отвечает за 10 секунд • 24/7</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6 leading-tight">
              Ваш автосалон теряет 50% лидов каждый месяц
            </h1>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground/80 mb-6">
              Пока менеджеры спят — клиенты уходят к конкурентам
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              AI-бот отвечает на Авито 24/7 за 10 секунд, собирает номера телефонов и передаёт горячие заявки менеджерам. Рост лидов на 40-50% без увеличения рекламного бюджета.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8 rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
            {videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                className="w-full aspect-video"
                poster=""
              >
                Ваш браузер не поддерживает видео
              </video>
            ) : (
              <div className="aspect-video bg-slate-800 flex flex-col items-center justify-center gap-4 p-8">
                <Icon name="Video" className="text-slate-400" size={64} />
                <p className="text-slate-400 text-lg">Загрузите видео для главной страницы</p>
                <VideoUploader onVideoUploaded={setVideoUrl} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            <Button 
              size="default" 
              className="w-full py-6"
              onClick={() => scrollToSection('calculator')}
            >
              <Icon name="Calculator" size={18} className="mr-2" />
              Калькулятор
            </Button>
            <Button 
              size="default" 
              variant="outline"
              className="w-full py-6"
              onClick={() => scrollToSection('results')}
            >
              <Icon name="TrendingUp" size={18} className="mr-2" />
              Результаты
            </Button>
            <Button 
              size="default" 
              className="w-full py-6"
              asChild
            >
              <a 
                href="https://t.me/khurmapro_bot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).ym) {
                    (window as any).ym(106250852, 'reachGoal', 'click_try_bot_hero');
                  }
                }}
              >
                <Icon name="MessageCircle" size={18} />
                Попробовать
              </a>
            </Button>
            <Button 
              size="default" 
              variant="outline"
              className="w-full py-6"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).ym) {
                  (window as any).ym(106250852, 'reachGoal', 'click_callback');
                }
                scrollToSection('callback-form');
              }}
            >
              <Icon name="Phone" size={18} className="mr-2" />
              Обратный звонок
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
