import type { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
  title?: string
}

export const Layout = ({ children }: LayoutProps) => {
  return <div className="min-h-screen bg-base-300 py-7 px-4 relative">{children}</div>
}
