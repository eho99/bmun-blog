import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            get(name) {
                return request.cookies.get(name)?.value
            },
            set(name, value, options) {
                response.cookies.set({
                    name,
                    value,
                    ...options,
                })
            },
            remove(name, options) {
                response.cookies.set({
                    name,
                    value: '',
                    ...options,
                })
            },
        },
    }
)
  
  await supabase.auth.getSession()
  
  return response
}