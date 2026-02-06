import { Head, Link } from '@inertiajs/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faInstagram, faGithub, faMedium, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faIdBadge, faKey, faUser } from '@fortawesome/free-solid-svg-icons'

import { InputForm } from '../../Components/Forms/InputForm'
import { SelectForm } from '../../Components/Forms/SelectForm'
import { SocialMedia } from '../../Components/SocialMedia'
import { SubmitButton } from '../../Components/Button/SubmitButton'
import { useRegister } from '../../Hooks/Auth/useRegister'

export default function Register() {
  const { form, submit } = useRegister()

  return (
    <>
      <Head title="Register" />

      <section className="bg-white min-h-screen">
        <div className="container px-6 py-24 mx-auto lg:py-16">
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
                Sign Up your account
              </h2>
            </div>

            <div className="mt-8 lg:w-1/2 lg:mt-0">
              <form
                onSubmit={submit}
                className="w-full lg:max-w-xl space-y-4"
              >
                <InputForm
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.data.name}
                  onChange={e => form.setData('name', e.target.value)}
                  error={form.errors.name}
                  icon={<FontAwesomeIcon icon={faUser} className="w-6 h-6 mx-3 text-gray-300" />}
                />

                <InputForm
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.target.value)}
                  error={form.errors.email}
                  icon={<FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 mx-3 text-gray-300" />}
                />

                <InputForm
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.data.password}
                  onChange={e => form.setData('password', e.target.value)}
                  error={form.errors.password}
                  icon={<FontAwesomeIcon icon={faKey} className="w-6 h-6 mx-3 text-gray-300" />}
                />

                <InputForm
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm password"
                  value={form.data.password_confirmation}
                  onChange={e =>
                    form.setData('password_confirmation', e.target.value)
                  }
                  error={form.errors.password_confirmation}
                  icon={<FontAwesomeIcon icon={faKey} className="w-6 h-6 mx-3 text-gray-300" />}
                />

                <SelectForm
                  name="role_id"
                  value={form.data.role_id}
                  onChange={e => form.setData('role_id', e.target.value)}
                  error={form.errors.role_id}
                  icon={
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      className="w-5 h-5"
                    />
                  }
                >
                  <option value="">Select role</option>
                  <option value="1">Admin</option>
                  <option value="2">Cashier</option>
                  <option value="3">Marketing</option>
                </SelectForm>

                <SubmitButton disabled={form.processing}>
                  Sign Up
                </SubmitButton>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-3 text-gray-400">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link
                      href="/login"
                      className="text-cyan-600 hover:underline font-semibold"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-8 md:mt-16 flex items-center justify-center gap-6">
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
