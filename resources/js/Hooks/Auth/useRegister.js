import { useForm } from '@inertiajs/react'

export function useRegister() {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
  })

  const submit = (e) => {
    e.preventDefault()
    form.post('/register')
  }

  return { form, submit }
}
