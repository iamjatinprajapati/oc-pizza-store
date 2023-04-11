import { Inter, Fira_Code } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const FiraCode = Fira_Code({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export { FiraCode, inter }