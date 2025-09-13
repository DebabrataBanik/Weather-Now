import type { PropsWithChildren } from "react"
import Header from "./Header"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen mx-auto container">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout