import './globals.css';
import './hex-aeros.css';
import './aeros-product.css';
import './harvey-aeros.css';
import './dashboard-v2.css';
import './demo-tour.css';
import './clean-aeros.css';
import './premium-dashboard.css';
import './harvey-flow.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — AI operations software for aviation',
  description:'Aeros helps aviation teams schedule flights, manage aircraft and crew, track maintenance, recover disruptions, and run the operation from one intelligent workspace.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
