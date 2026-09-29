import './globals.css';
import Shell from '../components/Shell';
export const metadata={title:'Rho — The market layer for AI data',description:'Rho measures the marginal value of training data and builds market infrastructure around AI data.'};
export default function RootLayout({children}){return <html lang="en"><body><Shell>{children}</Shell></body></html>}
