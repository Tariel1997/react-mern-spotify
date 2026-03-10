import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

import { Button } from './components/ui/button'

function App() {
  return (
    <>
      <header>
        <Show when="signed-out">
          <SignInButton>
            <Button>Sign In</Button>
          </SignInButton>
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </>
  )
}

export default App
