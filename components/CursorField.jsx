'use client';
import {useEffect,useRef} from 'react';

export default function CursorField(){
 const cursor=useRef(null), glow=useRef(null), bits=useRef([]);
 useEffect(()=>{
   if(!window.matchMedia('(pointer:fine)').matches) return;
   let tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty,raf;
   const pts=Array.from({length:14},()=>({x:tx,y:ty}));
   const move=e=>{tx=e.clientX;ty=e.clientY;document.documentElement.style.setProperty('--mx',tx+'px');document.documentElement.style.setProperty('--my',ty+'px')};
   const loop=()=>{
     cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;
     if(cursor.current) cursor.current.style.transform=`translate3d(${tx}px,${ty}px,0)`;
     if(glow.current) glow.current.style.transform=`translate3d(${cx}px,${cy}px,0)`;
     pts.forEach((p,i)=>{
       const lead=i===0?{x:cx,y:cy}:pts[i-1];
       p.x+=(lead.x-p.x)*(.28-i*.006);p.y+=(lead.y-p.y)*(.28-i*.006);
       const el=bits.current[i]; if(el) el.style.transform=`translate3d(${p.x}px,${p.y}px,0) rotate(${i%2?6:-6}deg)`;
     });
     raf=requestAnimationFrame(loop);
   };
   window.addEventListener('pointermove',move);raf=requestAnimationFrame(loop);
   return()=>{window.removeEventListener('pointermove',move);cancelAnimationFrame(raf)}
 },[]);
 return <div className="cursorSystem" aria-hidden="true">
   <div ref={glow} className="cursorGridGlow"/>
   <div ref={cursor} className="rhoCursor"><span>ρ</span></div>
   <div className="binaryTrail">{Array.from({length:14}).map((_,i)=><i ref={el=>bits.current[i]=el} key={i}>{i%3===0?'01':i%3===1?'10':'ρ'}</i>)}</div>
 </div>
}