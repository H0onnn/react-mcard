import { colors } from '@/styles/colorPalette'
import styled from '@emotion/styled'
import Dimmed from '@shared/Dimmed'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

interface Props {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

const Alert = ({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: Props) => {
  if (!open) return null

  return (
    <Dimmed>
      <Container>
        <Text typo="t4" bold display="block" style={{ marginBottom: 6 }}>
          {title}
        </Text>
        {description ? <Text typo="t7">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            onClick={onButtonClick}
            weak
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </Container>
    </Dimmed>
  )
}

export default Alert

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var(--alert-zindex);
  width: 320px;
  padding: 24px;
  box-sizing: border-box;
`
