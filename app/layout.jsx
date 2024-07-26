import './globals.css'

export const metadata = {
  title: 'Trip Planner',
  description: 'Plan your trip day by day',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}