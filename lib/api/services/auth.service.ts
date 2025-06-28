import apiClient from '../client';
import { IUser } from '@/types';

// 로그인 요청 데이터
export interface ILoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 데이터
export interface ILoginResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}

// 회원가입 요청 데이터
export interface IRegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  businessName: string;
  businessNumber: string;
  contactName: string;
  contactPhone: string;
  businessType: string;
  address: string;
  detailAddress?: string;
  zipCode: string;
}

// 사업자등록번호 검증 응답
export interface IBusinessVerificationResponse {
  isValid: boolean;
  businessName?: string;
  businessType?: string;
  status?: string;
  address?: string;
}

// 비밀번호 재설정 요청
export interface IResetPasswordRequest {
  email: string;
}

// 비밀번호 변경 요청
export interface IChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

class AuthService {
  private readonly basePath = '/auth';

  /**
   * 로그인
   */
  async login(data: ILoginRequest): Promise<ILoginResponse> {
    return apiClient.post<ILoginResponse>(`${this.basePath}/login`, data);
  }

  /**
   * 회원가입
   */
  async register(data: IRegisterRequest): Promise<ILoginResponse> {
    return apiClient.post<ILoginResponse>(`${this.basePath}/register`, data);
  }

  /**
   * 로그아웃
   */
  async logout(): Promise<void> {
    return apiClient.post<void>(`${this.basePath}/logout`);
  }

  /**
   * 토큰 갱신
   */
  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    return apiClient.post<{ token: string; refreshToken: string }>(`${this.basePath}/refresh`, {
      refreshToken,
    });
  }

  /**
   * 현재 사용자 정보 조회
   */
  async getCurrentUser(): Promise<IUser> {
    return apiClient.get<IUser>(`${this.basePath}/me`);
  }

  /**
   * 사업자등록번호 검증
   */
  async verifyBusinessNumber(businessNumber: string): Promise<IBusinessVerificationResponse> {
    return apiClient.post<IBusinessVerificationResponse>(`${this.basePath}/verify-business`, {
      businessNumber,
    });
  }

  /**
   * 이메일 중복 확인
   */
  async checkEmailExists(email: string): Promise<{ exists: boolean }> {
    return apiClient.get<{ exists: boolean }>(`${this.basePath}/check-email`, {
      params: { email },
    });
  }

  /**
   * 비밀번호 재설정 이메일 발송
   */
  async sendResetPasswordEmail(data: IResetPasswordRequest): Promise<void> {
    return apiClient.post<void>(`${this.basePath}/reset-password`, data);
  }

  /**
   * 비밀번호 변경
   */
  async changePassword(data: IChangePasswordRequest): Promise<void> {
    return apiClient.put<void>(`${this.basePath}/change-password`, data);
  }

  /**
   * 프로필 업데이트
   */
  async updateProfile(data: Partial<IUser>): Promise<IUser> {
    return apiClient.put<IUser>(`${this.basePath}/profile`, data);
  }

  /**
   * 계정 삭제
   */
  async deleteAccount(password: string): Promise<void> {
    return apiClient.delete<void>(`${this.basePath}/account`, {
      data: { password },
    });
  }
}

// 싱글톤 인스턴스 생성
export const authService = new AuthService();

export default authService; 