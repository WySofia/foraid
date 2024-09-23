import { useState } from 'react'
import { Button } from '@/components/ui/button'

export const App = () => {
  const [count, setCount] = useState(0)

  return (
      <>
          <Button onClick={() => setCount(count + 1)}>Increment {count}</Button>
    </>
  )
}