import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <h1 className='text-4xl'>Welcome</h1>
      <div className='flex mt-10'>
        <a className='inline-block mr-6' href="/login">Login here</a>
        <a href="/register">Register here</a>
      </div>
    </main>
  )
}
