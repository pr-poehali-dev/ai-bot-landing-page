import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              💡 НАША ИСТОРИЯ
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Мы сами потеряли миллионы на Авито — создали решение
            </h2>
          </div>
          
          <Card className="p-8 md:p-12 shadow-xl">
            <div className="prose prose-lg max-w-none">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" className="text-primary" size={32} />
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-foreground mb-4">
                    Меня зовут <span className="font-bold">Алексей</span>, я 7 лет был менеджером в автосалоне. 
                    Каждый день видел одно и то же: <span className="text-primary font-semibold">ночью клиенты пишут с Авито — утром уже купили у конкурента</span>. 
                    Мы теряли до 60% лидов просто потому, что люди не хотели ждать.
                  </p>
                  
                  <div className="bg-blue-50 border-l-4 border-primary p-6 my-6 rounded-r-lg">
                    <p className="text-foreground leading-relaxed">
                      В 2022 году я собрал команду программистов и <span className="font-semibold">6 месяцев тестировали AI-бота на реальных объявлениях</span>. 
                      Научили его отвечать как опытный продавец: уточнять потребности, рассказывать о комплектациях, собирать контакты.
                    </p>
                  </div>
                  
                  <p className="text-lg leading-relaxed text-foreground mb-6">
                    Результат — конверсия выросла с <span className="line-through text-muted-foreground">0,14%</span> до 
                    <span className="text-primary font-bold text-2xl mx-2">0,36%</span>. 
                    Это <span className="bg-primary text-white px-3 py-1 rounded-full font-bold">+157%</span>!
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl">
                      <p className="text-3xl font-bold text-primary mb-1">200+</p>
                      <p className="text-sm text-muted-foreground">Автосалонов работают с нами</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl">
                      <p className="text-3xl font-bold text-primary mb-1">+75%</p>
                      <p className="text-sm text-muted-foreground">Рост продаж в среднем</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl">
                      <p className="text-3xl font-bold text-primary mb-1">24/7</p>
                      <p className="text-sm text-muted-foreground">Работа без выходных</p>
                    </div>
                  </div>
                  
                  <p className="text-lg leading-relaxed text-foreground mt-6">
                    Сейчас наш бот работает в автосалонах по всей России. 
                    <span className="font-semibold"> Каждый месяц помогаем дилерам продавать на 75% больше машин без найма менеджеров.</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
