import { useState } from 'react'
import { 약관목록 } from '@constants/apply'
import { ApplyValues } from '@models/apply'
import Agreement from '@shared/Agreement'
import FixedBottomButton from '@shared/FixedBottomButton'

const Terms = ({
  onNext,
}: {
  onNext: (terms: ApplyValues['terms']) => void
}) => {
  const [termsAgreement, setTermsAgreement] = useState(() => {
    return 약관목록.reduce<Record<string, boolean>>(
      (prev, cur) => ({
        ...prev,
        [cur.id]: false,
      }),
      {},
    )
  })

  const allAgreed = Object.values(termsAgreement).every((v) => v)

  const handleAllAgreement = (
    _: React.MouseEvent<HTMLElement>,
    checked: boolean,
  ) => {
    setTermsAgreement((prev) => {
      return Object.keys(prev).reduce<Record<string, boolean>>(
        (prev, cur) => ({
          ...prev,
          [cur]: checked,
        }),
        {},
      )
    })
  }

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allAgreed} onChange={handleAllAgreement}>
          약관에 모두 동의
        </Agreement.Title>
        {약관목록.map(({ id, title, link }) => (
          <Agreement.Description
            key={id}
            link={link}
            checked={termsAgreement[id]}
            onChange={(_, checked) => {
              setTermsAgreement((prev) => ({
                ...prev,
                [id]: checked,
              }))
            }}
          >
            {title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!allAgreed}
        onClick={() => {
          onNext(Object.keys(termsAgreement))
        }}
      />
    </div>
  )
}

export default Terms
