import {NextResponse} from 'next/server';
import {createServerClient} from '@supabase/ssr';

const protectedPrefixes=['/dashboard','/engine','/billing','/settings'];

export async function middleware(request){
  const url=new URL(request.url);
  const hasConfig=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  if(!hasConfig||process.env.AEROS_DEMO_MODE==='true') return NextResponse.next();

  let response=NextResponse.next({request});
  const supabase=createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,{
    cookies:{
      getAll(){return request.cookies.getAll();},
      setAll(cookiesToSet){
        cookiesToSet.forEach(({name,value})=>request.cookies.set(name,value));
        response=NextResponse.next({request});
        cookiesToSet.forEach(({name,value,options})=>response.cookies.set(name,value,options));
      }
    }
  });
  const {data:{user}}=await supabase.auth.getUser();
  const isProtected=protectedPrefixes.some(prefix=>url.pathname.startsWith(prefix));
  if(isProtected&&!user){
    const login=new URL('/login/',request.url);
    login.searchParams.set('next',url.pathname+url.search);
    return NextResponse.redirect(login);
  }
  if(user&&(url.pathname.startsWith('/login')||url.pathname.startsWith('/signup'))){
    return NextResponse.redirect(new URL('/dashboard/',request.url));
  }
  return response;
}

export const config={matcher:['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']};
