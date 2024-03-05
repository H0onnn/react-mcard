/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

interface Props {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'li' | 'div'
}

const ListRow = ({
  left,
  contents,
  right,
  withArrow,
  onClick,
  as = 'li',
}: Props) => {
  return (
    <Flex as={as} css={listRowContainerStyles} onClick={onClick} align="center">
      <Flex css={listLeftStyles}>{left}</Flex>
      <Flex css={listContentStyles}>{contents}</Flex>
      <Flex>{right}</Flex>
      {withArrow && <IconArrowRight />}
    </Flex>
  )
}

const listRowContainerStyles = css`
  padding: 8px 24px;
`

const listLeftStyles = css`
  margin-right: 14px;
`

const listContentStyles = css`
  flex: 1;
`

const ListRowTexts = ({
  title,
  subtitle,
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
}) => {
  return (
    <Flex direction="column">
      <Text bold>{title}</Text>
      <Text typo="t7">{subtitle}</Text>
    </Flex>
  )
}

const ListRowSkeleton = () => {
  return (
    <Flex as="li" css={listRowContainerStyles} align="center">
      <Flex css={listLeftStyles}></Flex>
      <Flex css={listContentStyles}>
        <ListRow.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subtitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

const IconArrowRight = () => {
  return (
    <svg
      height="20px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 " />
    </svg>
  )
}

ListRow.Texts = ListRowTexts
ListRow.Skeleton = ListRowSkeleton

export default ListRow
