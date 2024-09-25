import { Suspense } from 'react'

import { SignInForm } from '@/components/forms/sign-in-form'

export default function SignInPage() {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  )
}
