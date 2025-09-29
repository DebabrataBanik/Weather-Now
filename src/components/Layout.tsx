import type { PropsWithChildren } from "react"
import Header from "./Header"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen mx-auto max-w-[1440px]">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout