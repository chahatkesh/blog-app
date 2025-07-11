import mongoose from 'mongoose'

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB Connected")
  } catch (error) {
    console.error("Database connection error:", error)
    throw error
  }
}
