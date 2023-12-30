import mongooseConnect from '@/lib/mongoose'
import { Product } from '@/models/Product'

export default async function handler(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === 'POST') {
    const { title, description, price, images, category, details, brand, gender, sizes, colors } = req.body
    const data = await Product.create({
      title,
      description,
      price,
      images,
      category,
      details,
      brand,
      gender,
      sizes,
      colors,
    })
    res.status(200).json({ success: true, data })
  }

  if (method === 'PUT') {
    const { _id, title, description, price, images, category, details, brand, gender, sizes, colors } = req.body
    const data = await Product.updateOne(
      { _id },
      { title, description, price, images, category, details, brand, gender, sizes, colors },
    )
    res.status(200).json({ success: true, data })
  }

  if (method === 'GET') {
    if (req.query.id) {
      const data = await Product.findOne({ _id: req.query.id })
      res.status(200).json({ success: true, data })
    } else {
      const data = await Product.find()
      res.status(200).json({ success: true, data })
    }
  }

  if (method === 'DELETE') {
    if (!req.query.id) {
      res.status(400).json({ message: 'Id field is required' })
      return
    }
    await Product.deleteOne({ _id: req.query.id })
    res.status(200).json({ success: true, message: 'Successfully deleted item' })
  }
}
