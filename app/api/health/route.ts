import { NextResponse } from 'next/server';
import { dataService } from '@/lib/dataService';

export async function GET() {
  try {
    const health = await dataService.healthCheck();
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      ...health,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    }, { status: 500 });
  }
}
