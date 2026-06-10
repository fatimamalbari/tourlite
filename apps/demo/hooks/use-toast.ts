import { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

// Simple pub/sub for global toast triggering
type Listener = (toast: Toast) => void;
let listeners: Listener[] = [];

export const toast = {
  notify: (title: string, options?: { description?: string; type?: ToastType }) => {
    const newToast: Toast = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description: options?.description,
      type: options?.type || 'info',
    };
    listeners.forEach((listener) => listener(newToast));
  },
  success: (title: string, description?: string) => {
    toast.notify(title, { description, type: 'success' });
  },
  error: (title: string, description?: string) => {
    toast.notify(title, { description, type: 'error' });
  },
  info: (title: string, description?: string) => {
    toast.notify(title, { description, type: 'info' });
  }
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleToast = (newToast: Toast) => {
      setToasts((prev) => [...prev, newToast]);
      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, 3000);
    };

    listeners.push(handleToast);
    return () => {
      listeners = listeners.filter((l) => l !== handleToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, removeToast };
}
