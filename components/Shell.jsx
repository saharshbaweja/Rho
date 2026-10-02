'use client';
import Link from 'next/link';
import {ChevronDown} from 'lucide-react';

export default function Shell({children}){
  return <>
    <div className="a-announcement">
      <span>BUILDING WITH DESIGN PARTNERS</span>
      <b>Aeros is the AI-native operating system for general aviation.</b>
      <a href="#contact">JOIN THE PILOT ↗</a>
    </div>
    <header className="a-nav">
      <Link href="/" className="a-brand" aria-label="Aeros home">
        <span className="a-mark"><i/><i/><b>A</b></span>
        <strong>AEROS</strong>
      </Link>
      <nav className="a-links">
        <a href="#product">PRODUCT</a>
        <a href="#operations">OPERATIONS</a>
        <a href="#network">NETWORK</a>
        <a href="#roadmap">ROADMAP</a>
        <button>RESOURCES <ChevronDown size={10}/></button>
      </nav>
      <div className="a-actions">
        <a className="a-contact" href="#contact">Contact</a>
        <a className="a-cta" href="#contact">Become a design partner</a>
      </div>
    </header>
    <main>{children}</main>
  </>;
}