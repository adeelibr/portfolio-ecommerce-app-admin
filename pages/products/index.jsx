import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import axios from 'axios'

import Spinner from '@/components/Spinner'

function formatPrice(inputString) {
  // Extract numbers from the string
  let number = inputString.match(/\d+\.?\d*/)[0]
  // Format the number as a price
  let formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
  return formattedPrice
}

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    setLoading(true)
    axios.get('/api/products').then((res) => {
      setProducts(res.data.data)
      setLoading(false)
    })
  }, [])

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
              <p className="mt-1.5 text-md text-gray-500 max-w-lg">Lets create a new product</p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-200 px-5 py-3 text-green-500 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                href="/products/create-product"
              >
                <span className="text-md font-medium"> Create Product </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-1 h-px border-0 bg-gray-300" />

      {loading && (
        <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
          <Spinner />
        </div>
      )}
      {!loading && products.length > 0 && (
        <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
          <div className="">
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <th className="px-6 py-4 font-medium text-gray-900">{index + 1}</th>
                    <th className="px-6 py-4 font-medium text-gray-900">{product.title}</th>
                    <td className="px-6 py-4 truncate max-w-xs">{product.description}</td>
                    <td className="px-6 py-4">{formatPrice(product.price)}</td>
                    <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                      <Link href={`/products/delete/${product._id}`} className="text-red-500">
                        Delete
                      </Link>
                      <Link href={`/products/edit/${product._id}`} className="text-green-700">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && products.length === 0 && (
        <div className="mx-auto max-w-screen-2xl px-6 py-8 sm:px-6 sm:py-8 lg:px-8">no products</div>
      )}
    </div>
  )
}

export default Products
