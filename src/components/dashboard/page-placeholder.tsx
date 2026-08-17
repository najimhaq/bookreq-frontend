import type { ReactNode } from 'react';

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  children?: ReactNode;
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  icon,
  children,
}: PagePlaceholderProps) {
  return (
    <section className='relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-[0_12px_30px_rgba(29,39,33,0.07)] sm:p-8'>
      <div
        aria-hidden='true'
        className='absolute -right-16 -top-16 size-52 rounded-full bg-[#fff0d3] blur-3xl'
      />

      <div className='relative max-w-2xl'>
        <div className='grid size-12 place-items-center rounded-2xl bg-[#e7f0e8] text-primary'>
          {icon}
        </div>

        <p className='mt-6 text-sm font-bold uppercase tracking-[0.16em] text-accent'>
          {eyebrow}
        </p>

        <h1 className='mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-primary sm:text-4xl'>
          {title}
        </h1>

        <p className='mt-4 max-w-xl leading-7 text-text-secondary'>
          {description}
        </p>

        {children ? <div className='mt-7'>{children}</div> : null}
      </div>
    </section>
  );
}
