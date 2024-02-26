import styled from '@emotion/styled'

interface Props {
  align?: React.CSSProperties['alignItems']
  justify?: React.CSSProperties['justifyContent']
  direction?: React.CSSProperties['flexDirection']
}

const Flex = styled.div<Props>(({ align, justify, direction }) => ({
  display: 'flex',
  alignItems: align,
  justifyContent: justify,
  flexDirection: direction,
}))

export default Flex
