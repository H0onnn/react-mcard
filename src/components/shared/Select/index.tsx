/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { forwardRef } from 'react'
import { colors } from '@/styles/colorPalette'
import { Option } from '@models/apply'
import styled from '@emotion/styled'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Option[]
  placeholder?: string
}

const BaseSelect = styled.select`
  height: 52px;
  background-color: ${colors.grey};
  border: none;
  border-radius: 16px;
  padding: 0 16px;
  cursor: pointer;

  &:required:invalid {
    color: #c0c4c7;
  }
`

const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, options, placeholder, value, ...props }, ref) => {
    return (
      <Flex direction="column" css={selectContainerStyles}>
        {label ? (
          <Text
            typo="t7"
            color="black"
            display="inline-block"
            style={{ marginBottom: 6 }}
          >
            {label}
          </Text>
        ) : null}
        <BaseSelect required ref={ref} value={value} {...props}>
          <option disabled hidden value="">
            {placeholder}
          </option>
          {options.map(({ label, value }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </BaseSelect>
      </Flex>
    )
  },
)

export default Select

const selectContainerStyles = css`
  padding: 10px 24px;
`
