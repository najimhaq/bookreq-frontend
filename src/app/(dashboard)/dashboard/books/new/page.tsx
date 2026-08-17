import { BookPlus } from 'lucide-react';

import { PagePlaceholder } from '@/components/dashboard/page-placeholder';

export default function AddBookPage() {
  return (
    <PagePlaceholder
      eyebrow='Add a book'
      title='A new story is about to find its shelf.'
      description='In the next step, we will add a complete book form here: title, author, publication year, cover image, reading status, and a personal note.'
      icon={<BookPlus className='size-6' />}
    />
  );
}
