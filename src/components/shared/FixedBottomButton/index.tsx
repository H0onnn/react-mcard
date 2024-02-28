/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { createPortal } from 'react-dom'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'

interface Props {
  label: string
  onClick: () => void
}

const FixedBottomButton = ({ label, onClick }: Props) => {
  const $portal = document.getElementById('root-portal')

  if (!$portal) return null

  return createPortal(
    <Container>
      <Button full size="medium" onClick={onClick} css={buttonStyles}>
        {label}
      </Button>
    </Container>,
    $portal,
  )
}

export default FixedBottomButton

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
`

const buttonStyles = css`
  border-radius: 8px;
`
