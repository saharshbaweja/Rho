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
  title:'Aeros — AI mission intelligence for Part 135 operators',
  description:'Aeros connects OpSpecs, company manuals, MEL/CDL, crew and aircraft status with live weather, NOTAMs, airport data and charts to produce a cited, continuously updated mission brief for every flight.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
