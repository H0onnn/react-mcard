import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUser from '@/hooks/auth/useUser'
import { ApplyValues, APPLY_STATUS } from '@models/apply'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

const Apply = ({
  onSubmit,
}: {
  onSubmit: (applyValues: ApplyValues) => void
}) => {
  const user = useUser()
  const { id } = useParams<{ id: string }>()

  const [applyValues, setApplyValues] = useState<Partial<ApplyValues>>({
    userId: user?.uid,
    cardId: id,
  })
  const [step, setStep] = useState<number>(0)

  const handleTermsChange = (terms: ApplyValues['terms']) => {
    setApplyValues((prev) => ({ ...prev, terms }))

    setStep((prev) => prev + 1)
  }

  const handleBasicInfoChange = (
    infoValues: Pick<ApplyValues, 'salary' | 'creditScore' | 'paymentDate'>,
  ) => {
    setApplyValues((prev) => ({ ...prev, ...infoValues }))

    setStep((prev) => prev + 1)
  }

  const handleCardInfoChange = (
    cardInfoValues: Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>,
  ) => {
    setApplyValues((prev) => ({ ...prev, ...cardInfoValues }))

    setStep((prev) => prev + 1)
  }

  useEffect(() => {
    if (step === 3) {
      onSubmit({
        ...applyValues,
        appliedAt: new Date(),
        status: APPLY_STATUS.READY,
      } as ApplyValues)
    }
  }, [applyValues, onSubmit, step])

  return (
    <div>
      {step === 0 && <Terms onNext={handleTermsChange} />}
      {step === 1 && <BasicInfo onNext={handleBasicInfoChange} />}
      {step === 2 && <CardInfo onNext={handleCardInfoChange} />}
    </div>
  )
}

export default Apply
