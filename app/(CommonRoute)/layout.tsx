import React from "react"
import Navbar from "./_component/shared/navbar/Navbar"
import Footer from "./_component/shared/footer/Footer"

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
