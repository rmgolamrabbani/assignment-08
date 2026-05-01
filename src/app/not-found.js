import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>পেজটি খুঁজে পাওয়া যায়নি!</h2>
      <p>দুঃখিত, আপনি যে ইউআরএলটি খুঁজছেন তা আমাদের কাছে নেই।</p>
      <Link href="/" className='border border-gray-600 rounded-lg px-4 py-2 text-gray-300 hover:bg-gray-800 transition'>
        হোম পেজে ফিরে যান
      </Link>
    </div>
  )
}


