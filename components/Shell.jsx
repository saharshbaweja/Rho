'use client';
import Link from 'next/link';
import {ChevronDown} from 'lucide-react';

export default function Shell({children}){
  return <>
    <div className="g-announcement">Introducing Plus and Apex, for more powerful reviews. <span>Learn more ↗</span></div>
    <header className="g-nav">
      <Link href="/" className="g-mark" aria-label="Greptile home"><span className="g-diamond">◆</span></Link>
      <nav className="g-links">
        <Link href="#examples">EXAMPLES</Link>
        <Link href="#pricing">PRICING</Link>
        <button>FEATURES <ChevronDown size={10}/></button>
        <Link href="#enterprise">ENTERPRISE</Link>
        <Link href="#blog">BLOG</Link>
        <button>RESOURCES <ChevronDown size={10}/></button>
      </nav>
      <div className="g-actions">
        <a className="g-contact" href="#contact">Contact sales</a>
        <a className="g-sign" href="#start">Sign up</a>
      </div>
    </header>
    <main>{children}</main>
  </>;
}