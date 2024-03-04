import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'

const FullPageLoader = ({ message }: { message?: string }) => {
  return (
    <Flex
      style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0 }}
      justify="center"
      align="center"
    >
      <Flex direction="column" align="center">
        <img
          width={120}
          src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-47-323_512.gif"
          alt="로딩"
        />

        {message && (
          <>
            <Spacing size={120} />
            <Text typo="t4" bold>
              {message}
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default FullPageLoader
