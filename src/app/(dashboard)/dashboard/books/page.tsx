import { BookOpen, Plus } from 'lucide-react';
import Link from 'next/link';

import { PagePlaceholder } from '@/components/dashboard/page-placeholder';
import { Button } from '@/components/ui/button';

export default function MyBooksPage() {
  return (
    <PagePlaceholder
      eyebrow='My bookshelf'
      title='Your books will live here.'
      description='Once you add a book, you will be able to organize it by author, update its reading status, and keep every reading memory in one place.'
      icon={<BookOpen className='size-6' />}
    >
      <Link href='/dashboard/books/new'>
        <Button>
          <Plus className='size-4' />
          Add your first book
        </Button>
      </Link>
    </PagePlaceholder>
  );
}
