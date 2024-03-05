import { useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

const Review = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // 최초 한 번만 동작
  })

  const { data = [], isLoading } = useQuery(
    ['review'],
    () => {
      return new Promise<string[]>((res) => {
        setTimeout(() => {
          res(['너무 좋아요', '꼭 신청하세요 !!'])
        }, 2000)
      })
    },
    {
      enabled: inView, // inView가 true일 때만 동작
    },
  )

  return (
    <div ref={ref}>
      {isLoading ? (
        <>
          <Skeleton width={30} height={10} />
          <Spacing size={3} />
          <Skeleton width={30} height={10} />
        </>
      ) : (
        data.map((review) => <div>{review}</div>)
      )}
    </div>
  )
}

export default Review
