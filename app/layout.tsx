import '../styles/globals.css'
import React, { ReactNode } from 'react'
import Head from './head'
import Header from './Components/Header'

export default function RootLayout(
    {children}:{children:ReactNode}
) {
  return (
    <html lang="en">
      <Head/>
      <body className="font-Poppins">
        <Header/>
        {children}
      </body>
    </html>
  )
}
