/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { createPortal } from 'react-dom'
import Button from '@shared/Button'
import { colors } from '@/styles/colorPalette'

interface Props {
  label: string
  onClick: () => void
  disabled?: boolean
}

const FixedBottomButton = ({ label, onClick, disabled }: Props) => {
  const $portal = document.getElementById('root-portal')

  if (!$portal) return null

  return createPortal(
    <Container>
      <Button
        full
        size="medium"
        onClick={onClick}
        css={buttonStyles}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portal,
  )
}

export default FixedBottomButton

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.white};
  padding: 20px 10px 8px;
  transform: translateY(100%);

  animation: ${slideup} 0.5s ease-in-out forwards;
`

const buttonStyles = css`
  border-radius: 8px;
`
