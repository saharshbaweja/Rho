import './globals.css';
import './hex-aeros.css';
import './aeros-product.css';
import './harvey-aeros.css';
import './dashboard-v2.css';
import './demo-tour.css';
import './clean-aeros.css';
import './premium-dashboard.css';
import './harvey-flow.css';
import './mission-site.css';
import './aeros-studio.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — Operational intelligence for flight operations',
  description:'Aeros connects operator rules, live aviation data, crew and aircraft state to produce source-backed mission decisions and continuous operational monitoring.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
