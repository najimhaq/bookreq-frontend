export function BooksLoadingSkeleton() {
  return (
    <div className='space-y-7'>
      <div>
        <div className='h-4 w-28 animate-pulse rounded bg-[#ded3c1]' />
        <div className='mt-3 h-10 w-72 max-w-full animate-pulse rounded bg-[#efe5d5]' />
        <div className='mt-3 h-5 w-full max-w-xl animate-pulse rounded bg-[#efe5d5]' />
      </div>

      <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className='overflow-hidden rounded-2xl border border-border bg-surface'
          >
            <div className='aspect-[4/3] animate-pulse bg-[#efe5d5]' />
            <div className='space-y-3 p-5'>
              <div className='h-5 animate-pulse rounded bg-[#efe5d5]' />
              <div className='h-4 w-2/3 animate-pulse rounded bg-[#efe5d5]' />
              <div className='mt-6 h-4 w-1/2 animate-pulse rounded bg-[#efe5d5]' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
