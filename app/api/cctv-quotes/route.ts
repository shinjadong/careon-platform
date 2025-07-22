import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// CCTV 견적 요청 데이터 타입
interface CCTVQuoteRequest {
  // 기본 정보
  installationPlace: string;
  businessType?: string;
  businessTypeOther?: string;
  businessSize: string;
  
  // 설치 정보
  installationLocations: string[];
  installationLocationOther?: string;
  installationQuantities: { [location: string]: number };
  
  // 견적 정보
  calculatedPrice: number;
  finalQuoteMethod: string;
  contactMethod: string;
  
  // 고객 정보
  businessName: string;
  contactName: string;
  phone: string;
  businessLocation: string;
  agreeTerms: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: CCTVQuoteRequest = await request.json();

    // 필수 필드 검증
    const requiredFields = [
      'installationPlace', 'businessSize', 'installationLocations',
      'installationQuantities', 'calculatedPrice', 'finalQuoteMethod',
      'contactMethod', 'businessName', 'contactName', 'phone',
      'businessLocation', 'agreeTerms'
    ];

    for (const field of requiredFields) {
      if (!body[field as keyof CCTVQuoteRequest]) {
        return NextResponse.json(
          { error: `필수 필드가 누락되었습니다: ${field}`, success: false },
          { status: 400 }
        );
      }
    }

    // 총 CCTV 대수 계산
    const totalCameras = Object.values(body.installationQuantities).reduce(
      (sum, qty) => sum + qty, 0
    );

    // Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('cctv_quotes')
      .insert({
        installation_place: body.installationPlace,
        business_type: body.businessType,
        business_type_other: body.businessTypeOther,
        business_size: body.businessSize,
        installation_locations: body.installationLocations,
        installation_location_other: body.installationLocationOther,
        installation_quantities: body.installationQuantities,
        calculated_price: body.calculatedPrice,
        total_cameras: totalCameras,
        monthly_rental: body.calculatedPrice, // 동일값
        final_quote_method: body.finalQuoteMethod,
        contact_method: body.contactMethod,
        business_name: body.businessName,
        contact_name: body.contactName,
        phone: body.phone,
        business_location: body.businessLocation,
        agree_terms: body.agreeTerms,
        status: 'PENDING'
      })
      .select('id, submitted_at')
      .single();

    if (error) {
      console.error('Supabase 삽입 에러:', error);
      return NextResponse.json(
        { 
          error: '견적 요청 저장 중 오류가 발생했습니다.', 
          details: error.message,
          success: false 
        },
        { status: 500 }
      );
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      message: '견적 요청이 성공적으로 접수되었습니다.',
      data: {
        id: data.id,
        submittedAt: data.submitted_at,
        totalCameras,
        monthlyPrice: body.calculatedPrice
      }
    });

  } catch (error: any) {
    console.error('API 에러:', error);
    return NextResponse.json(
      { 
        error: '서버 오류가 발생했습니다.', 
        details: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
}

// GET 메서드: 견적 목록 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('cctv_quotes')
      .select('*')
      .order('submitted_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // 상태별 필터링
    if (status && status !== 'ALL') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase 조회 에러:', error);
      return NextResponse.json(
        { error: '데이터 조회 중 오류가 발생했습니다.', success: false },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
      total: data?.length || 0
    });

  } catch (error: any) {
    console.error('GET API 에러:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.', success: false },
      { status: 500 }
    );
  }
} 