import './App.css'
import Text from '@shared/Text'
import Button from '@shared/Button'

import { useAlertContext } from '@contexts/AlertContext'

function App() {
  return (
    <div>
      <Text typo="t1">t1</Text>
      <Text>t5</Text>
      <Button>click!</Button>
    </div>
  )
}

export default App
