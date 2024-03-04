import useUser from '@hooks/auth/useUser'
import { auth } from '@remote/firebase'
import { signOut } from 'firebase/auth'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Button from '@shared/Button'
import MyImage from '@components/my/MyImage'
import Spacing from '@shared/Spacing'

const MyPage = () => {
  const user = useUser()

  const handleLogout = () => signOut(auth)

  return (
    <Flex direction="column" align="center">
      <Spacing size={40} />
      <MyImage size={80} mode="upload" />

      <Spacing size={20} />
      <Text bold>{user?.displayName}</Text>

      <Spacing size={20} />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Flex>
  )
}

export default MyPage
