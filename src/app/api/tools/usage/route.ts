import { NextResponse } from 'next/server'
import { connect } from '@/dbConfig/dbConfig'
import mongoose from 'mongoose'

// Define Schema
const toolUsageSchema = new mongoose.Schema({
  date: Date,
  toolType: {
    type: String,
    enum: ['email', 'phone', 'page']
  },
  count: Number
})

// Get or create model
const ToolUsage = mongoose.models.ToolUsage || mongoose.model('ToolUsage', toolUsageSchema)

export async function GET() {
  try {
    await connect()
    
    const toolUsageData = await ToolUsage.find()
      .sort({ date: -1 })
      .limit(6)
      .lean()

    const formattedData = toolUsageData.map(item => ({
      date: new Date(item.date).toISOString().slice(0, 7),
      usage: item.usage
    }))

    return NextResponse.json(formattedData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tool usage data' }, { status: 500 })
  }
}