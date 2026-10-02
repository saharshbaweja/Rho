'use client';
import Link from 'next/link';
import {Plane,ArrowUpRight} from 'lucide-react';

export default function Shell({children}){
  return <>
    <header className="nav-shell">
      <Link href="/" className="brand">
        <span className="brand-icon"><Plane size={15}/></span>
        <span className="brand-name">AEROS</span>
      </Link>
      <nav className="nav-links">
        <a href="#platform">Platform</a>
        <a href="#recovery">Recovery</a>
        <a href="#network">Network</a>
        <a href="#vision">Vision</a>
      </nav>
      <a className="nav-cta" href="#contact">Design partner <ArrowUpRight size={13}/></a>
    </header>
    <main>{children}</main>
  </>;
}