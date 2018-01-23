import mongoose, { Schema } from 'mongoose'

const exampleSchema = new Schema({
  foo: { type: String, required: true },
  bar: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, index: true }
})

Object.assign(exampleSchema.statics, {
  getExamples () {
    return this.find()
  },
  getExample (id) {
    return this.findById(id)
  },
  postExample (example) {
    return this.create(example)
  }
})

export default mongoose.model('Example', exampleSchema)
