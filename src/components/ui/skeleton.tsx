import { cn } from '@/lib/utils'

const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-sm bg-gray-200', className)}
      {...props}
    />
  )
}

export { Skeleton }
