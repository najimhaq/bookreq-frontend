import { PenLine } from 'lucide-react';

import { PagePlaceholder } from '@/components/dashboard/page-placeholder';

export default function AuthorsPage() {
  return (
    <PagePlaceholder
      eyebrow='Authors'
      title='Every shelf begins with a voice.'
      description='This space will help you browse authors connected to your books and keep their work easy to find.'
      icon={<PenLine className='size-6' />}
    />
  );
}
