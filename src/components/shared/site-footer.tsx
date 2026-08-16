import Link from 'next/link';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa';

import { Logo } from './logo';

const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'My bookshelf', href: '/books' },
  { label: 'Sign in', href: '/sign-in' },
  { label: 'Create account', href: '/sign-up' },
] as const;

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/najimhaq',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/haq-najim/',
    icon: FaLinkedin,
  },
  {
    label: 'Discord',
    href: 'https://discord.com/users/mdnajimulhaque',
    icon: FaDiscord,
  },
] as const;

export function SiteFooter() {
  return (
    <footer className='border-t border-border bg-[#183b2b] text-[#f7f1e6]'>
      <div className='mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16'>
        <div className='grid gap-10 md:grid-cols-[1fr_auto] md:items-start'>
          <div>
            <Logo showTagline className='text-[#faecd0] hover:text-[#fff7e8]' />

            <p className='mt-5 max-w-sm text-sm leading-6 text-[#c9d4ca]'>
              A quiet home for the books you love, the stories you are reading,
              and the shelves you are still building.
            </p>

            <div className='mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#e7c879]'>
              <BookOpen className='h-4 w-4' />
              Made for thoughtful readers
            </div>

            <div className='mt-6 flex items-center gap-3'>
              {socialLinks.map((socialLink) => {
                const Icon = socialLink.icon;

                return (
                  <a
                    key={socialLink.label}
                    href={socialLink.href}
                    target='_blank'
                    rel='noreferrer'
                    aria-label={`Visit BookRaq on ${socialLink.label}`}
                    className='grid size-9 place-items-center rounded-lg border border-[#486553] text-[#c9d4ca] transition-all hover:-translate-y-0.5 hover:border-[#e7c879] hover:bg-[#244a37] hover:text-[#fff7e8]'
                  >
                    <Icon className='size-4' />
                  </a>
                );
              })}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-10 gap-y-3 text-sm sm:gap-x-16'>
            <div>
              <p className='mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#e7c879]'>
                Explore
              </p>

              <div className='flex flex-col items-start gap-3'>
                {footerLinks.slice(0, 2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='font-medium text-[#c9d4ca] transition-colors hover:text-[#fff7e8]'
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className='mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#e7c879]'>
                Account
              </p>

              <div className='flex flex-col items-start gap-3'>
                {footerLinks.slice(2).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className='font-medium text-[#c9d4ca] transition-colors hover:text-[#fff7e8]'
                  >
                    {link.label}
                  </Link>
                ))}

                <a
                  href='mailto:hello@bookraq.dev'
                  className='inline-flex items-center gap-1 font-medium text-[#c9d4ca] transition-colors hover:text-[#fff7e8]'
                >
                  Contact
                  <ArrowUpRight className='size-3.5' />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-12 flex flex-col gap-3 border-t border-[#486553] pt-6 text-xs text-[#aebfae] sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {new Date().getFullYear()} BookRaq. Built for thoughtful readers.
          </p>

          <div className='flex items-center gap-4'>
            <Link
              href='/privacy'
              className='transition-colors hover:text-[#fff7e8]'
            >
              Privacy
            </Link>

            <Link
              href='/terms'
              className='transition-colors hover:text-[#fff7e8]'
            >
              Terms
            </Link>

            <span>Made with care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
