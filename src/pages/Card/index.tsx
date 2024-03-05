/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useAlertContext } from '@contexts/AlertContext'
import useUser from '@hooks/auth/useUser'
import { getCard } from '@remote/card'
import { motion } from 'framer-motion'
import Top from '@shared/Top'
import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { useCallback } from 'react'

const CardPage = () => {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const user = useUser()
  const { open } = useAlertContext()

  const { data } = useQuery(['card', id], () => getCard(id), {
    enabled: id !== '',
  })

  const moveToApply = useCallback(() => {
    if (!user) {
      open({
        title: '로그인이 필요한 기능입니다.',
        onButtonClick: () => {
          navigate('/signin')
        },
      })

      return
    }

    navigate(`/apply/${id}`)
  }, [id, navigate, open, user])

  if (!data) return null

  const { name, corpName, promotion, tags, benefit } = data

  const subTitle = promotion ? removeHtml(promotion.title) : tags.join(', ')

  return (
    <div>
      <Top title={`${corpName} ${name}`} subtitle={subTitle} />

      <ul>
        {benefit.map((text, index) => {
          return (
            <motion.li
              initial={{ opacity: 0, translateX: -90 }}
              animate={{
                opacity: 1,
                translateX: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 0.1],
                delay: index * 0.1,
              }}
            >
              <ListRow
                as="div"
                key={text}
                left={<IconCheck />}
                contents={
                  <ListRow.Texts title={`혜택 ${index + 1}`} subtitle={text} />
                }
              />
            </motion.li>
          )
        })}
      </ul>

      {promotion && (
        <Flex direction="column" css={termsContainterStyles}>
          <Text bold>유의사항</Text>
          <Text typo="t7">{removeHtml(promotion.terms)}</Text>
        </Flex>
      )}

      <FixedBottomButton
        label="1분만에 신청하고 혜택받기"
        onClick={moveToApply}
      />
    </div>
  )
}

export default CardPage

const termsContainterStyles = css`
  margin-top: 80px;
  padding: 0 24px 80px;
`

const removeHtml = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, '')
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
