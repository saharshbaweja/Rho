import './globals.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — The operating system for general aviation',
  description:'Aeros continuously coordinates aircraft, crew, training, maintenance, weather, and ground operations.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}