import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/stores/auth.store';

// API 응답 타입
export interface IApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

// API 에러 타입
export interface IApiError {
  code: string;
  message: string;
  details?: unknown;
  status?: number;
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 요청 인터셉터
    this.instance.interceptors.request.use(
      (config) => {
        // 토큰이 있으면 헤더에 추가
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // 요청 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }
        
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 응답 로깅 (개발 환경에서만)
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
            status: response.status,
            data: response.data,
          });
        }
        
        return response;
      },
      (error) => {
        console.error('❌ Response Error:', error);
        
        // 401 에러 시 로그아웃 처리
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
          // 로그인 페이지로 리다이렉트 (클라이언트 사이드에서만)
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login';
          }
        }
        
        // 에러 객체 표준화
        const apiError: IApiError = {
          code: error.response?.data?.code || 'UNKNOWN_ERROR',
          message: error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.',
          details: error.response?.data?.details,
          status: error.response?.status,
        };
        
        return Promise.reject(apiError);
      }
    );
  }

  // GET 요청
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<IApiResponse<T>>(url, config);
    return response.data.data;
  }

  // POST 요청
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<IApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // PUT 요청
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<IApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // DELETE 요청
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<IApiResponse<T>>(url, config);
    return response.data.data;
  }

  // PATCH 요청
  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.patch<IApiResponse<T>>(url, data, config);
    return response.data.data;
  }

  // 파일 업로드
  async upload<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.instance.post<IApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    });

    return response.data.data;
  }
}

// 싱글톤 인스턴스 생성
export const apiClient = new ApiClient();

// 기본 export
export default apiClient; 