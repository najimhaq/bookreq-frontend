// src/components/admin/admin-dashboard-skeleton.tsx
export function AdminDashboardSkeleton() {
  return (
    <div className='space-y-8'>
      <section className='rounded-3xl border border-border bg-surface p-6 sm:p-8'>
        <div className='h-4 w-32 animate-pulse rounded bg-[#ded3c1]' />
        <div className='mt-4 h-10 w-72 animate-pulse rounded bg-[#efe5d5]' />
        <div className='mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-[#efe5d5]' />
      </section>

      <div className='grid gap-4 sm:grid-cols-3'>
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className='rounded-2xl border border-border bg-surface p-5'
          >
            <div className='size-11 animate-pulse rounded-xl bg-[#efe5d5]' />
            <div className='mt-5 h-9 w-16 animate-pulse rounded bg-[#efe5d5]' />
            <div className='mt-3 h-4 w-28 animate-pulse rounded bg-[#efe5d5]' />
          </div>
        ))}
      </div>

      <div className='grid gap-6 xl:grid-cols-2'>
        {[1, 2].map((item) => (
          <section
            key={item}
            className='rounded-3xl border border-border bg-surface p-6'
          >
            <div className='h-7 w-40 animate-pulse rounded bg-[#efe5d5]' />

            <div className='mt-6 space-y-4'>
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  className='h-12 animate-pulse rounded-xl bg-[#fffaf0]'
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
