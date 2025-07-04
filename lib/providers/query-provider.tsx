'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 stale time: 5분
            staleTime: 5 * 60 * 1000,
            // 기본 cache time: 10분
            gcTime: 10 * 60 * 1000,
            // 에러 시 재시도 횟수
            retry: (failureCount, error: unknown) => {
              // 401, 403, 404 에러는 재시도하지 않음
              if ((error as {status?: number})?.status === 401 || (error as {status?: number})?.status === 403 || (error as {status?: number})?.status === 404) {
                return false;
              }
              // 최대 3번까지 재시도
              return failureCount < 3;
            },
            // 재시도 지연 시간 (지수 백오프)
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // 윈도우 포커스 시 자동 refetch 비활성화
            refetchOnWindowFocus: false,
          },
          mutations: {
            // 뮤테이션 에러 시 재시도하지 않음
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 DevTools 표시 */}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
} 