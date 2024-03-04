import { useMutation } from 'react-query'
import { useAlertContext } from '@contexts/AlertContext'
import { applyCard } from '@remote/apply'
import { ApplyValues } from '@models/apply'

interface Props {
  onSuccess: () => void
  onError: () => void
}

const useApplyCardMutation = ({ onSuccess, onError }: Props) => {
  const { open } = useAlertContext()

  return useMutation((applyValues: ApplyValues) => applyCard(applyValues), {
    onSuccess: () => {
      onSuccess()
    },
    onError: () => {
      open({
        title: '카드 신청에 실패했어요, 나중에 다시 시도해주세요.',
        onButtonClick: () => onError(),
      })
    },
  })
}

export default useApplyCardMutation
