import { useEffect, useRef } from 'react'
import { Head, Link, usePage, router } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputForm } from '../../Components/Forms/InputForm'
import { SocialMedia } from '../../Components/SocialMedia'
import { SubmitButton } from '../../Components/Button/SubmitButton'
import { AlertModal } from '../../Components/Modals/AlertModal'
import { useAlertModal } from '../../Hooks/useAlertModal'
import { faLinkedin, faInstagram, faXTwitter, faMedium, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import { useLogin } from '../../Hooks/Auth/useLogin'

export default function Login() {
  const { form, submit } = useLogin()
  const { alert, showError, showSuccess } = useAlertModal()
  const prevProcessingRef = useRef(false)
  const { props } = usePage()

  useEffect(() => {
    if (props.loginSuccess && props.redirectTo) {
      showSuccess('Login berhasil', 'Berhasil')
      const timer = setTimeout(() => {
        router.visit(props.redirectTo)
      }, alert.duration)
      return () => clearTimeout(timer)
    }
  }, [props.loginSuccess, props.redirectTo, showSuccess, alert.duration])

  useEffect(() => {
    if (props.logoutSuccess) {
      showSuccess('Logout berhasil', 'Berhasil')
    }
  }, [props.logoutSuccess, showSuccess])

  useEffect(() => {
    const requestJustFailed =
      prevProcessingRef.current &&
      !form.processing &&
      Object.keys(form.errors).length > 0

    if (requestJustFailed) {
      const message =
        form.errors.email ||
        form.errors.password ||
        Object.values(form.errors)[0]
      showError(message, 'Login Gagal')
    }

    prevProcessingRef.current = form.processing
  }, [form.processing, form.errors, showError])

  return (
    <>
      <Head title="Login" />
      <AlertModal {...alert} />

      <section className="bg-white min-h-screen">
        <div className="container px-6 py-24 mx-auto lg:py-32">
          
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <span className="flex items-baseline">
                <span className="text-gray-800 text-2xl font-semibold">Cashier</span>
                <span className="text-cyan-600 text-2xl font-semibold">.Ku</span>
                <sup className="text-xs text-gray-800 ml-0.5">™</sup>
              </span>

              <p className="mt-4 text-gray-600 md:text-lg">
                Welcome back
              </p>

              <h2 className="mt-4 text-2xl font-medium text-gray-800 lg:text-3xl">
                Sign In to your account
              </h2>
            </div>

            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form
                onSubmit={submit}
                className="w-full lg:max-w-xl space-y-4"
              >
                
                <InputForm
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.target.value)}
                  error={form.errors.email}
                  required
                  icon={
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="w-6 h-6 mx-3 text-gray-300"
                    />
                  }
                />

                <InputForm 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.data.password}
                  onChange={e => form.setData('password', e.target.value)}
                  error={form.errors.password}
                  required
                  icon={
                    <FontAwesomeIcon
                      icon={faKey}
                      className="w-6 h-6 mx-3 text-gray-300"
                    />
                  }
                />

                <div className="w-full">
                  <SubmitButton>
                    Sign in
                  </SubmitButton>
                </div>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-3 text-gray-400">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link
                      href="/register"
                      className="text-cyan-600 hover:underline font-semibold"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 md:mt-24 flex items-center justify-center gap-6">
            <h3 className="text-cyan-600 font-base">
              Social networks
            </h3>

            <div className="flex items-center -mx-1.5">
              <SocialMedia href="https://twitter.com">
                <FontAwesomeIcon icon={faXTwitter} className="text-xl" />
              </SocialMedia>

              <SocialMedia href="https://linkedin.com">
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
              </SocialMedia>

              <SocialMedia href="https://facebook.com">
                <FontAwesomeIcon icon={faMedium} className="text-xl" />
              </SocialMedia>

              <SocialMedia href="https://instagram.com/bachtiarrizaa">
                <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              </SocialMedia>
              <SocialMedia href="https://github.com/bachtiarrizaa">
                <FontAwesomeIcon icon={faGithub} className="text-xl" />
              </SocialMedia>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
