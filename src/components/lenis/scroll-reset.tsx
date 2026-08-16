'use client';

import { useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    const hasPathnameChanged = previousPathnameRef.current !== pathname;

    if (!hasPathnameChanged || !lenis) {
      return;
    }

    lenis.scrollTo(0, {
      immediate: true,
    });

    previousPathnameRef.current = pathname;
  }, [lenis, pathname]);

  return null;
}
