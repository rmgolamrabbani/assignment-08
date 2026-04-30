import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>পেজটি খুঁজে পাওয়া যায়নি!</h2>
      <p>দুঃখিত, আপনি যে ইউআরএলটি খুঁজছেন তা আমাদের কাছে নেই।</p>
      <Link href="/">হোম পেজে ফিরে যান</Link>
    </div>
  )
}