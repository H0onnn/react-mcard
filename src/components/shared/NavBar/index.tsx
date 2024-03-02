/** @jsxImportSource @emotion/react */

import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'
import { css } from '@emotion/react'
import { signOut } from 'firebase/auth'
import { Link } from 'react-router-dom'
import { colors } from '@/styles/colorPalette'
import { auth } from '@remote/firebase'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

const NavBar = () => {
  const location = useLocation()
  const user = useUser()

  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const handleLogout = useCallback(() => {
    signOut(auth)
  }, [])

  const renderButton = useCallback(() => {
    if (user) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton, handleLogout])

  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      {renderButton()}
    </Flex>
  )
}

export default NavBar

const navbarContainerStyles = css`
  padding: 10px 24px;

  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.grey};
`
