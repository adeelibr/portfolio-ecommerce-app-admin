import mongooseConnect from '@/lib/mongoose'
import { Category } from '@/models/Category'

export default async function handle(req, res) {
  const { method } = req

  await mongooseConnect()

  if (method === 'POST') {
    const { name, parentCategory } = req.body

    const categoryDoc = await Category.create({ name, parent: parentCategory || undefined })
    res.status(200).json(categoryDoc)
  }

  if (method === 'GET') {
    const data = await Category.find().populate('parent');
    res.status(200).json(data)
  }

  if (method === 'PUT') {
    const { name, parentCategory, _id } = req.body

    const categoryDoc = await Category.updateOne({ _id }, { name, parent: parentCategory || undefined })
    res.status(200).json(categoryDoc)
  }

  if (method === 'DELETE') {
    const { _id } = req.query
    await Category.deleteOne({ _id })
    res.status(200).json({ status: true, message: 'Deleted successfully' })
  }
}
