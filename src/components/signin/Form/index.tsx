/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { colors } from '@/styles/colorPalette'
import validator from 'validator'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { FormValues } from '@/models/signin'

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력해주세요.'
  }

  return errors
}

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }))
    },
    [],
  )

  const erros = useMemo(() => validate(formValues), [formValues])

  const canSubmit = Object.keys(erros).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이매일"
        name="email"
        placeholder="satoru.gmail.com"
        onChange={handleFormValues}
        value={formValues.email}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
      />
      <Spacing size={32} />
      <Button
        size="medium"
        disabled={!canSubmit}
        onClick={() => onSubmit(formValues)}
      >
        로그인
      </Button>
      <Spacing size={12} />
      <Link to="/signup" css={linkStyles}>
        <Text typo="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

export default Form

const formContainerStyles = css`
  padding: 24px;
`

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`
