import { ListChecks } from 'lucide-react';

import { PagePlaceholder } from '@/components/dashboard/page-placeholder';

export default function ReadingListPage() {
  return (
    <PagePlaceholder
      eyebrow='Reading list'
      title='Choose what comes next.'
      description='Soon you will be able to view books by Want to Read, Reading, and Completed—so your next great read is always nearby.'
      icon={<ListChecks className='size-6' />}
    />
  );
}
