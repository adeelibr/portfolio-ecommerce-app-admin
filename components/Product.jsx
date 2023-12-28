/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ReactSortable } from 'react-sortablejs'
import axios from 'axios'
import Spinner from './Spinner'

const Product = () => {
  const router = useRouter()

  const [redirect, setRedirect] = useState(false)

  const [fields, setFields] = useState({
    title: '',
    category: '',
    images: [],
    description: '',
    price: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setItUploading] = useState(false)

  const uploadImages = async (event) => {
    const files = event.target?.files

    if (files.length <= 0) return // do nothing

    const uploadImagesQueue = []

    try {
      setItUploading(true)

      for (const file of files) {
        const data = new FormData()
        data.append('file', file)

        uploadImagesQueue.push(
          axios.post('/api/upload', data).then((res) => {
            setFields({ ...fields, images: [...fields.images, ...res.data.links] })
          }),
        )
      }

      await Promise.all(uploadImagesQueue)
      setItUploading(false)
    } catch (error) {
      // bail out error
      console.log('error', error)
      setItUploading(false)
    }
  }

  const handleDeleteImage = (imageIndex) => {
    const newUpdatedImages = [...fields.images]
    newUpdatedImages.splice(imageIndex, 1)
    setFields({ ...fields, images: newUpdatedImages })
  }

  const submitForm = async (event) => {
    event.preventDefault()

    const data = {
      title: fields.title,
      category: fields.category,
      images: fields.images,
      description: fields.description,
      price: fields.price,
    }

    try {
      setIsLoading(true)
      await axios.post('/api/products', data)
      setIsLoading(false)
      setRedirect(true)
    } catch (error) {
      // bail out error
      console.log('error while adding product', error)
    }
  }

  if (redirect) {
    router.push('/products')
    return
  }

  return (
    <form onSubmit={submitForm}>
      <div className="mx-auto max-w-screen-md my-4">
        <div>
          <label htmlFor="title-field" className="mb-1 block text-md font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title-field"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4"
            placeholder="Add product title"
            value={fields.title}
            onChange={(event) => setFields({ ...fields, title: event.target.value })}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mx-auto max-w-screen-md my-4">
        <div>
          <label htmlFor="category-field" className="mb-1 block text-md font-medium text-gray-700">
            Category
          </label>
          <select
            id="category-field"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4"
            value={fields.category}
            onChange={(event) => setFields({ ...fields, category: event.target.value })}
          >
            <option value="">No category selected</option>
            <option value="2">Option02</option>
            <option value="3">Option03</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-screen-md my-4">
        <label htmlFor="image-field" className="mb-1 block text-md font-medium text-gray-700">
          Images
        </label>
        <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-blue-300">
          <div className="space-y-1 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </div>
            <div className="text-gray-600">
              <span className="font-medium text-primary-500 hover:text-primary-700">Click to upload </span>
              or drag and drop
            </div>
            <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
          </div>
          <input id="fileInput" type="file" className="hidden" accept="image/*" multiple onChange={uploadImages} />
        </label>
      </div>

      <div className="mx-auto max-w-screen-md my-4 flex justify-center items-center">
        {isUploading && <Spinner />}
        {!isUploading && (
          <ReactSortable
            list={fields.images}
            setList={(newImageOrder) => setFields({ ...fields, images: newImageOrder })}
            animation={200}
            className="grid grid-cols-2 gap-4"
          >
            {fields.images.map((imageLink, index) => (
              <div key={imageLink} className="relative group">
                <img src={imageLink} alt="image" className="object-cover h-32 w-44 rounded-md p-2" />
                <div className="absolute top-2 right-2 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity ">
                  <button onClick={() => handleDeleteImage(index)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </ReactSortable>
        )}
      </div>

      <div className="mx-auto max-w-screen-md my-4">
        <div>
          <label htmlFor="description-field" className="mb-1 block text-md font-medium text-gray-700">
            Description
          </label>
          <textarea
            type="text"
            rows={5}
            id="description-field"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4"
            placeholder="Add product description"
            value={fields.description}
            onChange={(event) => setFields({ ...fields, description: event.target.value })}
          />
        </div>
      </div>

      <div className="mx-auto max-w-screen-md my-4">
        <div>
          <label htmlFor="price-field" className="mb-1 block text-md font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price-field"
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 p-4"
            placeholder="Add product price"
            value={fields.price}
            onChange={(event) => setFields({ ...fields, price: event.target.value })}
          />
        </div>
      </div>

      <div className="mx-auto max-w-screen-md my-4">
        <button
          className="inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500 w-full"
          type="submit"
          disabled={isLoading && isUploading}
        >
          Create Product
        </button>
      </div>
    </form>
  )
}

export default Product
