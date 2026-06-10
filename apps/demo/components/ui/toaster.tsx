'use client';

import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map((t) => {
        const isError = t.type === 'error';
        const isSuccess = t.type === 'success';

        return (
          <div
            key={t.id}
            className={`
              flex items-start gap-3 w-80 rounded-[var(--tl-radius)] border p-4 shadow-xl 
              bg-[var(--tl-panel)] border-[var(--tl-border-strong)]
              animate-in slide-in-from-right-8 fade-in duration-300
            `}
          >
            <div className="shrink-0 mt-0.5">
              {isError && <AlertCircle className="h-5 w-5 text-[var(--tl-destructive,red)]" />}
              {isSuccess && <CheckCircle2 className="h-5 w-5 text-[var(--tl-ok)]" />}
              {!isError && !isSuccess && <Info className="h-5 w-5 text-[var(--tl-accent)]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[var(--tl-fg)]">
                {t.title}
              </p>
              {t.description && (
                <p className="text-[12px] text-[var(--tl-muted)] mt-1 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-[var(--tl-faint)] hover:text-[var(--tl-fg)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
