import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  useEffect(() => {
    router.push('/login'),
      router.push('/signup'),
      router.push('/projects_overview')
  }, [])
  return <p>Weiterleitung…</p>
}