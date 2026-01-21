import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ComparisonSection() {
  const comparisons = [
    {
      parameter: 'Лидов в месяц',
      without: '170-190 шт',
      with: '250-270 шт',
      benefit: '+40-50%',
      icon: 'TrendingUp'
    },
    {
      parameter: 'Дополнительных лидов',
      without: '—',
      with: '+80-100 шт',
      benefit: 'Без рекламы',
      icon: 'Users'
    },
    {
      parameter: 'Время ответа клиенту',
      without: '30–60 мин',
      with: '10 сек',
      benefit: 'В 180 раз быстрее',
      icon: 'Clock'
    },
    {
      parameter: 'Работа ночью и выходные',
      without: '❌ Нет',
      with: '✅ 24/7',
      benefit: '+60% лидов',
      icon: 'Moon'
    },
    {
      parameter: 'Дополнительные продажи/мес',
      without: '—',
      with: '+5–7 авто',
      benefit: '+75%',
      icon: 'Car'
    },
    {
      parameter: 'Прибыль/мес (средний чек 50к)',
      without: '—',
      with: '+250 000 ₽',
      benefit: 'ROI 800%',
      icon: 'DollarSign'
    },
    {
      parameter: 'Нагрузка на менеджеров',
      without: 'Высокая',
      with: 'Снижена в 2 раза',
      benefit: 'Меньше выгорания',
      icon: 'Battery'
    },
    {
      parameter: 'Стоимость найма менеджера',
      without: '80 000 ₽/мес',
      with: '0 ₽',
      benefit: 'Экономия 960к/год',
      icon: 'PiggyBank'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              📊 СРАВНЕНИЕ
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Без бота vs С ботом
            </h2>
            <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Реальные цифры изменений после внедрения AI-бота в автосалонах
            </p>
          </div>

          {/* Mobile: Cards */}
          <div className="lg:hidden space-y-4">
            {comparisons.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as any} className="text-primary" size={24} />
                  </div>
                  <h3 className="font-bold text-lg">{item.parameter}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Без бота</p>
                    <p className="font-semibold">{item.without}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">С ботом</p>
                    <p className="font-semibold text-primary">{item.with}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <Icon name="ArrowUpRight" size={16} />
                    {item.benefit}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl shadow-2xl">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-blue-600 text-white">
                  <th className="px-6 py-4 text-left font-bold">Параметр</th>
                  <th className="px-6 py-4 text-center font-bold">Без бота</th>
                  <th className="px-6 py-4 text-center font-bold">С ботом</th>
                  <th className="px-6 py-4 text-center font-bold">Выгода</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-slate-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={item.icon as any} className="text-primary" size={20} />
                        </div>
                        <span className="font-semibold">{item.parameter}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-muted-foreground">{item.without}</td>
                    <td className="px-6 py-4 text-center font-bold text-primary">{item.with}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                        <Icon name="ArrowUpRight" size={14} />
                        {item.benefit}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-8 bg-gradient-to-br from-primary/5 to-blue-50">
              <p className="text-2xl font-bold mb-2">
                Средний ROI: <span className="text-primary text-4xl">800%</span>
              </p>
              <p className="text-muted-foreground">
                Окупаемость за первый месяц работы бота
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}