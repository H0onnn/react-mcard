import { css } from '@emotion/react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getCard } from '@remote/card'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

const CardPage = () => {
  const { id } = useParams()

  const { data } = useQuery(['card', id], () => getCard(id!), {
    enabled: !!id,
  })

  if (!data) return null

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle = promotion ? removeHtml(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <ListRow
              key={text}
              left={<IconCheck />}
              contents={
                <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
              }
            />
          )
        })}
      </ul>

      {promotion && (
        <Flex direction="column" css={termsContainterStyles}>
          <Text bold>유의사항</Text>
          <Text typo="t7">{removeHtml(promotion.terms)}</Text>
        </Flex>
      )}

      <FixedBottomButton label="신청하기" onClick={() => {}} />
    </div>
  )
}

export default CardPage

const termsContainterStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

const removeHtml = (text: string) => {
  let output = ''

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '<') {
      while (text[i] !== '>') {
        i++
      }
    } else {
      output += text[i]
    }
  }

  return output
}

const IconCheck = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <path
        d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        fill="#6563ff"
      />
    </svg>
  )
}
