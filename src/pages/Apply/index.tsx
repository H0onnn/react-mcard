import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useApplyCardMutation from '@components/apply/hooks/useApplyCardMutation'
import usePollApplyStatus from '@components/apply/hooks/usePollApplyStatus'
import useUser from '@hooks/auth/useUser'
import { updateApplyCard } from '@remote/apply'
import { APPLY_STATUS } from '@models/apply'
import Apply from '@components/apply'

const ApplyPage = () => {
  const [readyToPoll, setReadyToPoll] = useState<boolean>(false)
  const user = useUser()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

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

  if (readyToPoll || isLoading) {
    return <div>로딩중 . . .</div>
  }

  return <Apply onSubmit={mutate} />
}

export default ApplyPage
