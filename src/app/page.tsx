import styles from './page.module.css'
import React from 'react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>app/page 입니다.</div>
      <Link href="/login">Go to Login</Link>
    </main>
  )
}
