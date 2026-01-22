import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface VideoUploaderProps {
  onVideoUploaded: (url: string) => void;
}

export default function VideoUploader({ onVideoUploaded }: VideoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setError('Пожалуйста, выберите видео файл');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('Размер файла не должен превышать 50 МБ');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result?.toString().split(',')[1];
        
        const response = await fetch('https://functions.poehali.dev/0dbdb6cd-b3f5-4a0e-b65b-94e5bdeaa101', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            video: base64,
            filename: file.name,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          onVideoUploaded(data.url);
        } else {
          setError('Ошибка при загрузке видео');
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Ошибка при загрузке видео');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="video-upload">
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById('video-upload')?.click()}
          className="cursor-pointer"
        >
          {isUploading ? (
            <>
              <Icon name="Loader2" className="animate-spin mr-2" size={18} />
              Загрузка...
            </>
          ) : (
            <>
              <Icon name="Upload" className="mr-2" size={18} />
              Загрузить видео
            </>
          )}
        </Button>
      </label>
      <input
        id="video-upload"
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
