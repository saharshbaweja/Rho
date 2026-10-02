import './globals.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — Operating system for general aviation',
  description:'Aeros continuously coordinates aircraft, crew, maintenance, weather, training, and daily operations.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}