"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/Button';

interface AdminLoginProps {
  onLogin: (key: string) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const envKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

    if (inputKey.trim() === envKey) {
      onLogin(inputKey.trim());
    } else {
      setError('Invalid admin key. Please try again.');
      setInputKey('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 rounded-2xl bg-purple-900/20 border border-purple-700 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-4">
        Admin Authentication
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Enter the admin key to access story editor
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={inputKey}
          onChange={(e) => {
            setInputKey(e.target.value);
            setError('');
          }}
          placeholder="Admin key"
          className="w-full px-4 py-3 border border-purple-300 dark:border-purple-700 rounded-3xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-purple-900/30 text-gray-900 dark:text-white"
          autoFocus
        />

        {error && (
          <p className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="white"
          size="md"
          className="w-full font-bold"
        >
          Login
        </Button>
      </form>
    </motion.div>
  );
}
