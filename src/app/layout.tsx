import type { Metadata } from 'next';
import '@fontsource-variable/mona-sans';
import './globals.css';
export const metadata: Metadata = {
 title: 'MAC Engineering Services — Engineered to flow.',
 description: 'HVAC and MEP engineering from design to commissioning. Explore MAC Engineering Services’ commercial, industrial and institutional projects.',
 robots: { index: true, follow: true },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body>{children}</body></html>;
}
