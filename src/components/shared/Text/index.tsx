import { Typography, typographyMap } from '@/styles/typo'
import { colors, Colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'

interface Props {
  typo?: Typography
  color?: Colors
  display?: React.CSSProperties['display']
  textAlign?: React.CSSProperties['textAlign']
  fontWeight?: React.CSSProperties['fontWeight']
  bold?: boolean
}

const Text = styled.span<Props>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
    display,
  }),
  ({ typo = 't5' }) => typographyMap[typo],
)

export default Text
