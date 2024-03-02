import { useRecoilValue } from 'recoil'
import { userAtom } from '@atoms/user'

const useUser = () => {
  const user = useRecoilValue(userAtom)

  return user
}

export default useUser
