import './globals.css';
import './hex-aeros.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Aeros — AI operations platform for general aviation',
  description:'Aeros gives flight schools and operators one intelligent workspace to schedule, recover, dispatch, maintain, and understand the operation.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}