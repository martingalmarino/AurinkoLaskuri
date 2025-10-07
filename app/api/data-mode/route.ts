import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/dataService';

export async function POST(request: NextRequest) {
  try {
    const { useRealAPIs } = await request.json();
    
    if (typeof useRealAPIs !== 'boolean') {
      return NextResponse.json({
        error: 'useRealAPIs must be a boolean',
      }, { status: 400 });
    }

    dataService.setUseRealAPIs(useRealAPIs);
    
    return NextResponse.json({
      success: true,
      useRealAPIs: dataService.isUsingRealAPIs(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to update data mode:', error);
    
    return NextResponse.json({
      error: 'Failed to update data mode',
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      useRealAPIs: dataService.isUsingRealAPIs(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to get data mode:', error);
    
    return NextResponse.json({
      error: 'Failed to get data mode',
    }, { status: 500 });
  }
}
