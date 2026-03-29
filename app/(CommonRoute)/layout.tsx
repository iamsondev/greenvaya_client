import React from "react"
import Navbar from "./_component/shared/navbar/Navbar"

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Navbar></Navbar>
      {children}
      <div>Footer</div>
    </div>
  )
}
