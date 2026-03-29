import { axiosInstance } from '@/lib/axios'
import { useAuthStore } from '@/stores/useAuthStore.ts'
import { useAuth } from '@clerk/react'
import { Loader } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth()
  const [loading, setLoading] = useState(true)
  const { checkAdminStatus } = useAuthStore()

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken()
          if (token) {
            config.headers.Authorization = `Bearer ${token}`
          }
          return config
        } catch (error) {
          console.error('Error fetching token in interceptor', error)
          return config
        }
      },
      (error) => Promise.reject(error),
    )

    const initAuth = async () => {
      try {
        const token = await getToken()

        if (token) {
          await checkAdminStatus()
        }
      } catch (error) {
        console.log('Error in auth provider', error)
      } finally {
        setLoading(false)
      }
    }

    void initAuth()

    return () => axiosInstance.interceptors.request.eject(requestInterceptor)
  }, [getToken, checkAdminStatus])

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    )

  return <>{children}</>
}

export default AuthProvider
