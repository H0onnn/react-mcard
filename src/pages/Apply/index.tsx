import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import useUser from '@hooks/auth/useUser'
import useAppliedCard from '@components/apply/hooks/useAppliedCard'
import { useAlertContext } from '@contexts/AlertContext'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import Apply from '@components/apply'
import FullPageLoader from '@components/shared/FullPageLoader'

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState<boolean>(false)
  const user = useUser()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { open } = useAlertContext()

  const { data } = useAppliedCard({
    userId: user?.uid as string,
    cardId: id as string,
    options: {
      onSuccess: (applied) => {
        if (!applied) return

        if (applied.status === APPLY_STATUS.COMPLETE) {
          open({
            title: '이미 발급이 완료된 카드입니다.',
            onButtonClick: () => window.history.back(),
          })

          return
        }

        setReadyToPoll(true)
      },
      onError: () => {},
      suspense: true,
    },
  })

  const { mutate, isLoading } = useApplyCardMutation({
    onSuccess: () => {
      setReadyToPoll(true)
    },
    onError: () => {
      window.history.back()
    },
  })

  usePollApplyStatus({
    onSuccess: async () => {
      await updateApplyCard({
        applyValues: {
          status: APPLY_STATUS.COMPLETE,
        },
        userId: user?.uid as string,
        cardId: id as string,
      })

      navigate('/apply/done?success=true', { replace: true })
    },
    onError: async () => {
      await updateApplyCard({
        applyValues: {
          status: APPLY_STATUS.REJECT,
        },
        userId: user?.uid as string,
        cardId: id as string,
      })

      navigate('/apply/done?success=false', { replace: true })
    },
    enabled: readyToPoll,
  })

  if (data && data.status === APPLY_STATUS.COMPLETE) return null

  if (readyToPoll || isLoading) {
    return <FullPageLoader message="카드를 신청중입니다." />
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
