import './globals.css';
import './aeros-product.css';
import './dashboard-v2.css';
import './demo-tour.css';
import './premium-dashboard.css';
import './harvey-flow.css';
import './mission-site.css';
import './aeros-studio.css';
import './dust-site.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — AI intelligence for flight operations',
  description:'Aeros connects operator-specific procedures with live flight conditions to evaluate operational impact, generate source-backed options, brief crews and continuously monitor each mission.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}
