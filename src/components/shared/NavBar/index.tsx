/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

const NavBar = () => {
  return (
    <Flex justify="space-between" align="center" css={navbarContainerStyles}>
      <Link to="/">홈</Link>
      <Link to="/signup">
        <Button>로그인/회원가입</Button>
      </Link>
    </Flex>
  )
}

export default NavBar

const navbarContainerStyles = css`
  padding: 10px 24px;
`
