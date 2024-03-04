import { useState } from 'react'
import { ApplyValues } from '@models/apply'
import Button from '@shared/Button'
import FixedBottomButton from '@shared/FixedBottomButton'

type CardInfoValues = Pick<ApplyValues, 'isMaster' | 'isRf' | 'isHipass'>

const CardInfo = ({
  onNext,
}: {
  onNext: (cardInfoValues: CardInfoValues) => void
}) => {
  const [cardInfoValues, setCardInfoValues] = useState<CardInfoValues>({
    isMaster: false,
    isRf: false,
    isHipass: false,
  })

  const { isHipass, isRf, isMaster } = cardInfoValues

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const $button = e.target as HTMLButtonElement

    setCardInfoValues((prev) => ({
      ...prev,
      [$button.name]: JSON.parse($button.dataset.value as string),
    }))
  }

  return (
    <div>
      <Button.Group title="해외결제">
        <Button
          name="isMaster"
          weak={!isMaster}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          Master
        </Button>
        <Button
          name="isMaster"
          weak={isMaster}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          국내전용
        </Button>
      </Button.Group>

      <Button.Group title="후불 교통기능">
        <Button
          name="isRf"
          weak={isRf}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isRf"
          weak={!isRf}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <Button.Group title="후불 하이패스">
        <Button
          name="isHipass"
          weak={isHipass}
          size="medium"
          data-value={false}
          onClick={handleButtonClick}
        >
          신청안함
        </Button>
        <Button
          name="isHipass"
          weak={!isHipass}
          size="medium"
          data-value={true}
          onClick={handleButtonClick}
        >
          신청
        </Button>
      </Button.Group>

      <FixedBottomButton label="다음" onClick={() => onNext(cardInfoValues)} />
    </div>
  )
}

export default CardInfo
