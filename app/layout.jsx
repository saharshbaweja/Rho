import './globals.css';
import Shell from '../components/Shell';

export const metadata={
  title:'Greptile — AI Code Review',
  description:'Greptile homepage baseline recreation.'
};

export default function RootLayout({children}){
  return <html lang="en"><body><Shell>{children}</Shell></body></html>;
}