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
import './visual-overhaul.css';
import './studio-home.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — Mission intelligence for Part 135 operators',
  description:'Aeros turns OpSpecs, manuals, aircraft and crew state, weather, NOTAMs, airport data and charts into one continuously updated, cited mission brief.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
