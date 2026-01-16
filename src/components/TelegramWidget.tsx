import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

const TelegramWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const telegramUrl = 'https://t.me/khurmapro_bot';

  const handleClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 animate-in slide-in-from-bottom-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#0088cc] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Поддержка</p>
                  <p className="text-xs text-gray-500">Обычно отвечаем за минуту</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Есть вопросы? Напишите нам в Telegram, и мы с радостью поможем!
            </p>
            <button
              onClick={handleClick}
              className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Открыть чат
            </button>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Открыть Telegram чат"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
};

export default TelegramWidget;
