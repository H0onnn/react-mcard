/** @jsxImportSource @emotion/react */

import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import useUser from '@hooks/auth/useUser'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { colors } from '@/styles/colorPalette'
import Flex from '@shared/Flex'
import Button from '@shared/Button'
import MyImage from '@components/my/MyImage'

const NavBar = () => {
  const location = useLocation()
  const user = useUser()

  const showSignButton =
    ['/signup', '/signin'].includes(location.pathname) === false

  const renderButton = useCallback(() => {
    if (user) {
      return (
        <Link to="/my">
          <MyImage />
        </Link>
      )
    }

    if (showSignButton) {
      return (
        <Link to="/signin">
          <Button>로그인/회원가입</Button>
        </Link>
      )
    }

    return null
  }, [user, showSignButton])

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
