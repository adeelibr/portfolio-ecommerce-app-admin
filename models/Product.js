import { Schema, model, models, Types } from 'mongoose'

const ProductSchema = new Schema({
  title: { type: String, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'Category' },
  details: { type: String, required: false },
  brand: { type: String, required: false },
  gender: { type: String, required: false },
  sizes: { type: String, required: false },
  colors: { type: String, required: false },
})

export const Product = models.Product || model('Product', ProductSchema)
