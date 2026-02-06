import { useForm } from '@inertiajs/react'

export function useLogin() {
  const form = useForm({
    email: '',
    password: '',
  })

  const submit = (e) => {
    e.preventDefault()
    form.post('/login')
  }

  return { form, submit }
}
