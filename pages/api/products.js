import mongooseConnect from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default async function handler(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === 'POST') {
    const { title, description, price, images } = req.body
    const productDocument = await Product.create({ title, description, price, images })
    res.json(productDocument)
  }
}
