'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import authService, { 
  ILoginRequest, 
  IRegisterRequest, 
  IChangePasswordRequest,
  IResetPasswordRequest 
} from '@/lib/api/services/auth.service';
import { toast } from 'sonner';

// Query Keys
export const AUTH_QUERY_KEYS = {
  currentUser: ['auth', 'currentUser'] as const,
  verifyBusiness: (businessNumber: string) => ['auth', 'verifyBusiness', businessNumber] as const,
  checkEmail: (email: string) => ['auth', 'checkEmail', email] as const,
};

/**
 * 로그인 훅
 */
export function useLogin() {
  const router = useRouter();
  const { login: setAuthState, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setAuthState(data.user, data.token);
      toast.success('로그인되었습니다.');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.message || '로그인에 실패했습니다.');
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

/**
 * 회원가입 훅
 */
export function useRegister() {
  const router = useRouter();
  const { login: setAuthState, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setAuthState(data.user, data.token);
      toast.success('회원가입이 완료되었습니다.');
      router.push('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.message || '회원가입에 실패했습니다.');
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

/**
 * 로그아웃 훅
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: clearAuthState } = useAuthStore();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuthState();
      queryClient.clear(); // 모든 캐시 데이터 제거
      toast.success('로그아웃되었습니다.');
      router.push('/');
    },
    onError: (error: any) => {
      // 로그아웃은 실패해도 클라이언트 상태는 정리
      clearAuthState();
      queryClient.clear();
      toast.error(error.message || '로그아웃 중 오류가 발생했습니다.');
      router.push('/');
    },
  });
}

/**
 * 현재 사용자 정보 조회 훅
 */
export function useCurrentUser() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: AUTH_QUERY_KEYS.currentUser,
    queryFn: authService.getCurrentUser,
    enabled: isAuthenticated, // 인증된 상태에서만 실행
    retry: false,
    staleTime: 5 * 60 * 1000, // 5분
  });
}

/**
 * 사업자등록번호 검증 훅
 */
export function useVerifyBusinessNumber() {
  return useMutation({
    mutationFn: authService.verifyBusinessNumber,
    onError: (error: any) => {
      toast.error(error.message || '사업자등록번호 검증에 실패했습니다.');
    },
  });
}

/**
 * 이메일 중복 확인 훅
 */
export function useCheckEmailExists(email: string) {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.checkEmail(email),
    queryFn: () => authService.checkEmailExists(email),
    enabled: !!email && email.includes('@'), // 유효한 이메일 형식일 때만 실행
    retry: false,
  });
}

/**
 * 비밀번호 재설정 이메일 발송 훅
 */
export function useSendResetPasswordEmail() {
  return useMutation({
    mutationFn: authService.sendResetPasswordEmail,
    onSuccess: () => {
      toast.success('비밀번호 재설정 이메일이 발송되었습니다.');
    },
    onError: (error: any) => {
      toast.error(error.message || '이메일 발송에 실패했습니다.');
    },
  });
}

/**
 * 비밀번호 변경 훅
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
    },
    onError: (error: any) => {
      toast.error(error.message || '비밀번호 변경에 실패했습니다.');
    },
  });
}

/**
 * 프로필 업데이트 훅
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  return useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedUser) => {
      updateUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEYS.currentUser });
      toast.success('프로필이 업데이트되었습니다.');
    },
    onError: (error: any) => {
      toast.error(error.message || '프로필 업데이트에 실패했습니다.');
    },
  });
}

/**
 * 계정 삭제 훅
 */
export function useDeleteAccount() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: clearAuthState } = useAuthStore();

  return useMutation({
    mutationFn: authService.deleteAccount,
    onSuccess: () => {
      clearAuthState();
      queryClient.clear();
      toast.success('계정이 삭제되었습니다.');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.message || '계정 삭제에 실패했습니다.');
    },
  });
}

/**
 * 인증 상태 확인 유틸리티 훅
 */
export function useAuth() {
  const authState = useAuthStore();
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  return {
    ...authState,
    currentUser,
    isUserLoading,
    isReady: !authState.isLoading && !isUserLoading,
  };
} 