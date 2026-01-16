import Icon from '@/components/ui/icon';

export default function CTASection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const chatButton = document.querySelector('[aria-label="Открыть чат"]') as HTMLButtonElement;
      if (chatButton) chatButton.click();
    }, 800);
  };

  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-primary to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
            Готовы продавать больше машин?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Получите бесплатное демо AI-бота для вашего автосалона!
          </p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl text-lg"
          >
            <Icon name="MessageCircle" size={24} />
            Написать в чат
          </button>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                Осталось 2 места
              </div>
              <Icon name="Gift" className="mx-auto mb-3 text-yellow-300" size={32} />
              <p className="font-semibold text-lg">
                Первым 3 клиентам — скидка 20% на внедрение!
              </p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <Icon name="Clock" className="mx-auto mb-3 text-yellow-300" size={32} />
              <p className="font-semibold text-lg">
                Работает 24/7 — не теряйте клиентов по ночам и выходным!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}