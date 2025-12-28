"use client";
import { useLanguage } from '../lib/LanguageContext';
import Button from './Button';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={toggleLanguage}
        variant="ghost"
        size="sm"
      >
        {language === 'en' ? 'PT' : 'EN'}
      </Button>
    </div>
  );
}
