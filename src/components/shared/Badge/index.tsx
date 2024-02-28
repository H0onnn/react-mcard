import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import Text from '@shared/Text'

interface Props {
  label: string
}

const Badge = ({ label }: Props) => {
  return (
    <Container>
      <Text bold typo="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

export default Badge

const Container = styled.div`
  border-radius: 12px;
  background-color: ${colors.blue};
  padding: 2px 8px;
`
