'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-primary group-[.toaster]:border-border group-[.toaster]:shadow-sm',
          description: 'group-[.toast]:text-secondary',
          actionButton:
            'group-[.toast]:bg-black group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-background-subtle group-[.toast]:text-secondary'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
