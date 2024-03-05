import styled from '@emotion/styled'
import { colors } from '@/styles/colorPalette'

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Layout>
      <Container>
        <BaseProgressBar progress={progress} />
      </Container>
    </Layout>
  )
}

export default ProgressBar

const BaseProgressBar = styled.div<{ progress: number }>(({ progress }) => ({
  height: 10,
  backgroundColor: colors.blue,
  transform: `scaleX(${progress})`,
  transition: 'transform 0.8s ease',
  transformOrigin: 'left',
}))

const Container = styled.div(() => ({
  width: '100%',
  height: 10,
  backgroundColor: colors.grey,
  overflow: 'hidden',
  borderRadius: 6,
}))

const Layout = styled.div({
  padding: '24px 24px 0 24px',
})
