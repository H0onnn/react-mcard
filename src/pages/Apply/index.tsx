import { useState } from 'react'
import Terms from '@components/apply/Terms'
import BasicInfo from '@components/apply/BasicInfo'
import CardInfo from '@components/apply/CardInfo'

const ApplyPage = () => {
  const [step, setStep] = useState<number>(0)

  return (
    <div>
      {step === 0 && <Terms />}
      {step === 1 && <BasicInfo />}
      {step === 2 && <CardInfo />}
    </div>
  )
}

export default ApplyPage
