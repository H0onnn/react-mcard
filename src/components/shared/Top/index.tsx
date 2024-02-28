/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface Props {
  title: string
  subtitle: string
}

const Top = ({ title, subtitle }: Props) => {
  return (
    <Flex direction="column" css={containerStyles}>
      <Text bold typo="t4">
        {title}
      </Text>
      <Text typo="t7">{subtitle}</Text>
    </Flex>
  )
}

export default Top

const containerStyles = css`
  padding: 24px;
`
