const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const artisanSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: function () { return this.userAuthType === 'email' } },
  userName: { type: String, required: true, unique: true },
  bio: { type: String },
  userAuthType: { type: String, enum: ['google', 'email'], required: true },
})

artisanSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12)
  }
})

const Artisan = mongoose.model('Artisan', artisanSchema)

module.exports = Artisan