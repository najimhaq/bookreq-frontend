// src/components/lenis/back-to-top.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

const SHOW_AFTER_SCROLL = 520;

export function BackToTop() {
  const lenis = useLenis();

  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  useLenis((lenisInstance) => {
    const nextIsVisible = lenisInstance.scroll > SHOW_AFTER_SCROLL;

    setIsVisible((currentIsVisible) => {
      return currentIsVisible === nextIsVisible
        ? currentIsVisible
        : nextIsVisible;
    });

    const nextProgress =
      lenisInstance.limit > 0
        ? Math.min((lenisInstance.scroll / lenisInstance.limit) * 100, 100)
        : 0;

    setScrollProgress((currentProgress) => {
      return Math.abs(currentProgress - nextProgress) < 1
        ? currentProgress
        : nextProgress;
    });
  });

  const handleScrollToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo({
        top: 0,
        behavior: 'auto',
      });

      return;
    }

    lenis?.scrollTo(0, {
      duration: 1.05,
    });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.82, y: 12 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.2,
            ease: 'easeOut',
          }}
          className='fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7'
        >
          <div className='group relative'>
            <span className='pointer-events-none absolute bottom-full right-0 mb-3 w-max translate-y-1 rounded-md border border-border bg-surface-elevated px-2.5 py-1.5 text-xs font-semibold text-text-secondary opacity-0 shadow-lg transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100'>
              Back to top
            </span>

            <button
              type='button'
              onClick={handleScrollToTop}
              aria-label='Scroll back to top'
              title='Back to top'
              className='relative grid size-11 place-items-center rounded-full border border-border bg-surface text-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(129,117,255,0.7)] hover:bg-surface-elevated hover:shadow-[0_14px_34px_rgba(109,93,251,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:size-12'
            >
              <span
                aria-hidden='true'
                className='absolute inset-0.75 rounded-full'
                style={{
                  background: `conic-gradient(
                    var(--primary) ${scrollProgress}%,
                    rgba(113, 128, 159, 0.2) ${scrollProgress}%
                  )`,
                }}
              />

              <span className='absolute inset-1.25 rounded-full bg-surface' />

              <ArrowUp className='relative z-10 size-4 transition-transform duration-200 group-hover:-translate-y-0.5 sm:size-4.5' />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
