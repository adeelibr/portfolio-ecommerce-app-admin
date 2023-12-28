import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import axios from 'axios'

import Product from '@/components/Product'
import Spinner from '@/components/Spinner'

const EditProduct = () => {
  const { data: session } = useSession()

  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    setLoading(true)
    axios.get(`/api/products?id=${id}`).then((res) => {
      setProduct(res.data.data)
      setLoading(false)
    })
  }, [id])

  if (!session) return null

  return (
    <div>
      <header>
        <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, <span className="text-green-700">{session.user?.name}!</span>
              </h1>
              <p className="mt-1.5 text-md text-gray-500 max-w-lg">Edit the product {product?.title}</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-200 px-5 py-3 text-green-500 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                href="/products"
              >
                <span className="text-md font-medium"> Go Back</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-1 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
        {loading && <Spinner />}
        {product && <Product {...product} />}
      </div>
    </div>
  )
}

export default EditProduct
