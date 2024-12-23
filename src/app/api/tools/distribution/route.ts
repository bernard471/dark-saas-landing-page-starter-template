import { NextResponse } from 'next/server'
import { connect } from '@/dbConfig/dbConfig'
import mongoose from 'mongoose'

// Define Schema
const toolStatsSchema = new mongoose.Schema({
  toolType: {
    type: String,
    enum: ['email', 'phone', 'page']
  },
  totalUsage: Number
})

// Get or create model
const ToolStats = mongoose.models.ToolStats || mongoose.model('ToolStats', toolStatsSchema)

export async function GET() {
  try {
    await connect()
    
    const toolDistributionData = await ToolStats.find()
      .select('name value -_id')
      .lean()

    return NextResponse.json(toolDistributionData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tool distribution data' }, { status: 500 })
  }
}
