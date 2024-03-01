/** @jsxImportSource @emotion/react */
// commit test

import { ChangeEvent, useCallback, useState, useMemo } from 'react'
import { css } from '@emotion/react'
import { FormValues } from '@models/signup'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import Spacing from '@shared/Spacing'
import validator from 'validator'

const validate = (formValues: FormValues) => {
  let errors: Partial<FormValues> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식이 올바르지 않습니다.'
  }

  if (formValues.password.length < 8) {
    errors.password = '비밀번호는 8자 이상 입력해주세요.'
  }

  if (
    validator.equals(formValues.password, formValues.passwordConfirm) === false
  ) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다.'
  }

  if (formValues.name.length < 2) {
    errors.name = '이름은 2자 이상 입력해주세요.'
  }

  return errors
}

const Form = ({ onSubmit }: { onSubmit: (formValues: FormValues) => void }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<FormValues>>({})

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prev) => ({
      ...prev,
      [e.target.name]: true,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const canSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="satoru@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={!!dirty.email && !!errors.email}
        helpMessage={!!dirty.email ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={!!dirty.password && !!errors.password}
        helpMessage={!!dirty.password ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호 확인"
        name="passwordConfirm"
        type="password"
        value={formValues.passwordConfirm}
        onChange={handleFormValues}
        hasError={!!dirty.passwordConfirm && !!errors.passwordConfirm}
        helpMessage={!!dirty.passwordConfirm ? errors.passwordConfirm : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="사토루"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={!!dirty.name && !!errors.name}
        helpMessage={!!dirty.name ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={!canSubmit}
        onClick={() => onSubmit(formValues)}
      />
    </Flex>
  )
}

export default Form

const formContainerStyles = css`
  padding: 24px;
`
