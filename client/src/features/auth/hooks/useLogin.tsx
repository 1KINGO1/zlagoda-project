import {useMutation} from '@tanstack/react-query';
import {authService} from '@/features/auth/services/auth.service';
import {ApiError} from '@/shared/types/ApiError';

interface UseLoginHandlers {
	onSuccess?: () => void;
	onError?: (error: ApiError) => void;
}

export const useLogin = (handlers: UseLoginHandlers) => {
	return useMutation({
		mutationFn: authService.login,
		onError: (error: ApiError) => {
			handlers.onError?.(error);
		},
		onSuccess: (data) => {
			handlers.onSuccess?.();
		},
	})
}