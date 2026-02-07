import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Head, Link } from '@inertiajs/react'

export default function Home() {
  return (
    <>
      <Head title="Beranda" />
      <section className="bg-white">
        <nav className="border-t-4 border-cyan-400">
          <div className="container flex items-center justify-between px-6 py-3 mx-auto">
            <Link className="flex items-baseline">
              <span className="text-gray-800 text-2xl font-semibold">Cashier</span>
              <span className="text-cyan-600 text-2xl font-semibold">.Ku</span>
              <sup className="text-xs text-gray-800 ml-0.5">™</sup>
            </Link>

            <div
              className="my-1 text-sm font-medium text-gray-500 rtl:-scale-x-100 hover:text-cyan-600 lg:mx-4 lg:my-0"
              href="#"
            >
              <FontAwesomeIcon icon={faCircleInfo} size="lg"/>
            </div>
          </div>
        </nav>

        <div className="container px-6 pb-10 pt-8 mx-auto">
          <div className="flex flex-col-reverse lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
              <div className="lg:max-w-lg">
                <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 lg:text-4xl">
                  <span className='text-cyan-600'>Selamat datang</span> di
                  <span className="text-gray-800"> Cashier</span>
                  <span className="text-cyan-600">.Ku</span>
                  <sup className="text-xl text-gray-800 ml-0.5">™</sup>
                </h1>

                <p className="mt-3 text-gray-600 text-justify">
                  Permudah proses penagihan dan pembayaran rumah sakit. 
                  Lacak invoice pasien, kelola pembayaran, dan buat laporan — semuanya dalam satu platform yang aman.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-6">   
                  <Link
                    href="/login"
                    className="text-center w-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 transform bg-cyan-600 border-2 border-cyan-600 rounded-lg hover:bg-cyan-600/85 sm:w-auto"
                  >
                    Masuk
                  </Link>

                  <Link
                    href="/register"
                    className="text-center w-full px-6 py-3 text-sm font-semibold text-cyan-600 transition-transform duration-300 transform bg-white border-2 border-cyan-600 rounded-lg hover:bg-cyan-50 sm:w-auto"
                  >
                    Daftar
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-full lg:w-1/2 mb-6 lg:mb-0">
              <img
                className="w-full h-full lg:max-w-3xl"
                src="/assets/images/home.png"
                alt="Catalogue Illustration"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
