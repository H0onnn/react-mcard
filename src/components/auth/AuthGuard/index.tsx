import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { userAtom } from '@/atoms/user'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [initiallize, setInitiallize] = useState<boolean>(false)
  const setUser = useSetRecoilState(userAtom)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }

    setInitiallize(true)
  })

  if (!initiallize) return null

  return <>{children}</>
}

export default AuthGuard
