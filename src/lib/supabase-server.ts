import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
            async getAll() {
                const cookieList = await cookieStore;
                return Array.from(cookieList.getAll()).map((cookie) => ({
                    name: cookie.name,
                    value: cookie.value,
                }))
            },
            async setAll(cookies) {
                cookies.map(async ({ name, value, ...options }) => {
                    (await cookieStore).set({ name, value, ...options })
                })
            },
        },
    }
)
}