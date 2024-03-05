/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getAdBanners } from '@remote/adBanner'
import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

import 'swiper/css'

const AdBanners = () => {
  const { data, isLoading } = useQuery('adBanners', getAdBanners)

  if (!data || isLoading) {
    return (
      <Container>
        <Flex direction="column" css={bannerContainerStyles}>
          <Text bold={true}>&nbsp;</Text>
          <Text typo="t7">&nbsp;</Text>
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <Swiper spaceBetween={8}>
        {data.map((banner) => {
          return (
            <SwiperSlide key={banner.id}>
              <Link to={banner.link}>
                <Flex direction="column" css={bannerContainerStyles}>
                  <Text bold>{banner.title}</Text>
                  <Text typo="t7">{banner.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Container>
  )
}

export default AdBanners

const Container = styled.div`
  padding: 24px;
`

const bannerContainerStyles = css`
  padding: 16px;
  background-color: ${colors.grey};
  border-radius: 4px;
`
