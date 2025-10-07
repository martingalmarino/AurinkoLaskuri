import { NextRequest, NextResponse } from 'next/server'
import { roiSolarCalculator } from '@/lib/roiSolarFI'
import { fmiClient } from '@/lib/fmiClient'
import { nordPoolClient } from '@/lib/nordPoolClient'
import { getKuntaBySlug } from '@/lib/kunnatFI'
import { SolarSystemInputs } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { inputs, kuntaSlug } = body

    if (!inputs || !kuntaSlug) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Validate inputs
    const validation = roiSolarCalculator.validateInputs(inputs)
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid inputs', details: validation.errors },
        { status: 400 }
      )
    }

    // Get kunta data
    const kunta = getKuntaBySlug(kuntaSlug)
    if (!kunta) {
      return NextResponse.json(
        { error: 'Kunta not found' },
        { status: 404 }
      )
    }

    // Fetch data in parallel
    const [solarRadiationData, electricityPriceData] = await Promise.all([
      fmiClient.getSolarRadiation(kunta.fmiStation),
      nordPoolClient.getElectricityPrice(),
    ])

    // Calculate ROI
    const result = roiSolarCalculator.calculateROI(
      inputs,
      solarRadiationData,
      electricityPriceData,
      kunta.subsidy
    )

    return NextResponse.json({
      success: true,
      result,
      metadata: {
        kunta: kunta.name,
        solarRadiation: solarRadiationData.annualRADGLO,
        electricityPrice: electricityPriceData.price,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Calculation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
