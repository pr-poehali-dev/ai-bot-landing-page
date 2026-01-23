import { useState } from 'react';
import Icon from '@/components/ui/icon';

const screenshots = [
  {
    url: 'https://cdn.poehali.dev/projects/a342f07f-f1f9-4615-b861-611d73a35a53/bucket/b84a15be-59c1-4f38-bea5-4186861cc87d.jpg',
    caption: 'Быстрый ответ на вопрос клиента'
  },
  {
    url: 'https://cdn.poehali.dev/projects/a342f07f-f1f9-4615-b861-611d73a35a53/bucket/87f2a763-5bad-41bd-8939-eda019df46e2.jpg',
    caption: 'Консультация по автомобилю'
  },
  {
    url: 'https://cdn.poehali.dev/projects/a342f07f-f1f9-4615-b861-611d73a35a53/bucket/3c6ddd3d-dbe3-4188-91e0-da015c630242.jpg',
    caption: 'Сбор контактных данных'
  }
];

export default function ScreenshotsSection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % screenshots.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + screenshots.length) % screenshots.length);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Скриншоты диалогов с ботом
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Нужно всего лишь вовремя ответить клиенту на его вопрос
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {screenshots.map((screenshot, index) => (
              <div 
                key={index}
                className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => openImage(index)}
              >
                <img 
                  src={screenshot.url} 
                  alt={screenshot.caption}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white font-semibold p-4 text-sm md:text-base">
                    {screenshot.caption}
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Icon name="Maximize2" size={20} className="text-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Закрыть"
          >
            <Icon name="X" size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 hidden md:block"
            aria-label="Предыдущее изображение"
          >
            <Icon name="ChevronLeft" size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 hidden md:block"
            aria-label="Следующее изображение"
          >
            <Icon name="ChevronRight" size={48} />
          </button>

          <div 
            className="max-w-5xl max-h-full w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={screenshots[selectedImage].url} 
              alt={screenshots[selectedImage].caption}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <p className="text-white text-center mt-4 text-lg font-semibold">
              {screenshots[selectedImage].caption}
            </p>

            <div className="flex gap-2 mt-4 md:hidden">
              <button
                onClick={prevImage}
                className="text-white hover:text-gray-300 transition-colors p-2"
                aria-label="Предыдущее изображение"
              >
                <Icon name="ChevronLeft" size={32} />
              </button>
              <button
                onClick={nextImage}
                className="text-white hover:text-gray-300 transition-colors p-2"
                aria-label="Следующее изображение"
              >
                <Icon name="ChevronRight" size={32} />
              </button>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {screenshots.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedImage ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
