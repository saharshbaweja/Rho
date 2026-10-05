import './globals.css';
import './hex-aeros.css';
import './aeros-product.css';
import './harvey-aeros.css';
import './dashboard-v2.css';
import './demo-tour.css';
import './clean-aeros.css';
import './premium-dashboard.css';
import './harvey-flow.css';
import './platform-expansion.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — AI operations software for aviation',
  description:'Aeros connects scheduling, dispatch, aircraft, maintenance, training, billing, reporting, compliance, and AI recovery in one operating system for aviation teams.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
