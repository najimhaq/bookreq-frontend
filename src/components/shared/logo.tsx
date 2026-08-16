import Link from 'next/link';
import { BookOpen } from 'lucide-react';

type LogoProps = {
  showTagline?: boolean;
  className?: string;
};

export function Logo({ showTagline = false, className }: LogoProps) {
  const logoColor = className ?? 'text-primary hover:text-accent';

  return (
    <Link
      href='/'
      aria-label='BookRaq home'
      className={`inline-flex items-center gap-3 transition-colors ${logoColor}`}
    >
      <span className='grid size-10 place-items-center rounded-xl bg-current/10'>
        <BookOpen className='size-5 stroke-current' strokeWidth={2.2} />
      </span>

      <span className='flex flex-col'>
        <span className='font-[family-name:var(--font-display)] text-2xl font-semibold leading-none tracking-tight'>
          BookRaq
        </span>

        {showTagline ? (
          <span className='mt-1 text-xs font-medium text-current/70'>
            Your personal library
          </span>
        ) : null}
      </span>
    </Link>
  );
}
