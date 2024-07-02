import mongoose from 'mongoose'

export const ConnectDB = async () => {
  await mongoose.connect('mongodb+srv://chahat:Chahat1234@cluster0.ijdl76j.mongodb.net/blog-app')
  console.log("DB Connected")
}
