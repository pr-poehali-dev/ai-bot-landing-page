import { MessageCircle, X, Send } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: number;
  text: string;
  from: 'user' | 'bot';
  timestamp: number;
}

const TelegramWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Здравствуйте! Чем могу помочь?',
      from: 'bot',
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedChatId) {
      setChatId(savedChatId);
    } else {
      const newChatId = `web_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setChatId(newChatId);
      localStorage.setItem('telegram_chat_id', newChatId);
    }

    const savedMessages = localStorage.getItem('telegram_messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error loading messages:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem('telegram_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || !chatId) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      from: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/ea82110a-ceb2-483e-abca-e7ba402bac62', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId: chatId,
          message: messageText,
          userId: chatId
        })
      });

      const data = await response.json();

      if (data.success) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: 'AI ассистент обрабатывает ваш запрос...',
          from: 'bot',
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, botMessage]);
        
        setTimeout(async () => {
          try {
            const pollResponse = await fetch(`https://functions.poehali.dev/fc7f8155-01f4-400e-bd52-c5c9af34df2f?chatId=${chatId}`);
            if (pollResponse.ok) {
              const pollData = await pollResponse.json();
              if (pollData.message) {
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    text: pollData.message
                  };
                  return updated;
                });
              }
            }
          } catch (pollError) {
            console.error('Polling error:', pollError);
          }
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: 'Извините, произошла ошибка при отправке сообщения. Проверьте настройки API или попробуйте позже.',
        from: 'bot',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col animate-in slide-in-from-bottom-5">
            <div className="flex items-start justify-between p-4 pb-3 border-b bg-gradient-to-r from-[#0088cc] to-[#00a0e4] rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Поддержка</p>
                  <p className="text-xs text-white/80">Онлайн</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                      msg.from === 'user'
                        ? 'bg-[#0088cc] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.from === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите сообщение..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  aria-label="Отправить сообщение"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
          aria-label="Открыть чат"
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