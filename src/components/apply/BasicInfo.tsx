import { useState } from 'react'
import { 연소득옵션, 신용점수옵션, 결제일옵션 } from '@constants/apply'
import { ApplyValues } from '@models/apply'
import Select from '@shared/Select'
import FixedBottomButton from '@shared/FixedBottomButton'

type InfoValues = Pick<ApplyValues, 'salary' | 'creditScore' | 'paymentDate'>

const BasicInfo = ({
  onNext,
}: {
  onNext: (InfoValues: InfoValues) => void
}) => {
  const [infoValues, setInfoValues] = useState<InfoValues>({
    salary: '',
    creditScore: '',
    paymentDate: '',
  })

  const handleInfoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setInfoValues((prev) => ({ ...prev, [name]: value }))
  }

  const allFilled = Object.values(infoValues).every((value) => value !== '')

  return (
    <div>
      <Select
        name="salary"
        label="연소득"
        options={연소득옵션}
        placeholder={연소득옵션[0].label}
        value={infoValues.salary}
        onChange={handleInfoChange}
      />
      <Select
        name="creditScore"
        label="신용점수"
        options={신용점수옵션}
        placeholder={신용점수옵션[0].label}
        value={infoValues.creditScore}
        onChange={handleInfoChange}
      />
      <Select
        name="paymentDate"
        label="결제일"
        options={결제일옵션}
        placeholder={결제일옵션[0].label}
        value={infoValues.paymentDate}
        onChange={handleInfoChange}
      />
      <FixedBottomButton
        label="다음"
        onClick={() => onNext(infoValues)}
        disabled={!allFilled}
      />
    </div>
  )
}

export default BasicInfo
