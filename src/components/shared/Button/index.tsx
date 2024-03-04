/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ButtonColor,
  buttonColorMap,
  ButtonSize,
  buttonSizeMap,
  buttonWeakMap,
} from '@/styles/button'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

interface Props {
  color?: ButtonColor
  size?: ButtonSize
  weak?: boolean
  full?: boolean
  disabled?: boolean
}

const BaseButton = styled.button<Props>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', weak }) =>
    weak ? buttonWeakMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: not-allowed;
        `
      : undefined,
)

const ButtonGroup = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => {
  return (
    <Flex direction="column" css={containerStyles}>
      {title && (
        <>
          <Text typo="t6" bold>
            {title}
          </Text>
          <Spacing size={8} />
        </>
      )}
      <Flex css={buttonGroupStyles}>{children}</Flex>
    </Flex>
  )
}

const buttonGroupStyles = css`
  flex-wrap: wrap;
  gap: 10px;

  & button {
    flex: 1;
  }
`

const containerStyles = css`
  padding: 10px 24px;
`

const Button = BaseButton as typeof BaseButton & {
  Group: typeof ButtonGroup
}

Button.Group = ButtonGroup

export default Button
