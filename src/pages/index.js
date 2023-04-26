import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
     <div>
      Hello
      <ul>
        <li>
          <Link href="About">
            About
          </Link>
        </li>
        
      </ul>
      <ul>
        <li>
          <Link href="Map/DisplayingMap">
            Map
          </Link>
        </li>
        
      </ul>
     </div>
         </>
  )
}
