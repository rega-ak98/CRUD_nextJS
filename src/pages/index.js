import RegistrationTable from '@/components/RegistrationTable'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <RegistrationTable />
    </div>
  )
}
