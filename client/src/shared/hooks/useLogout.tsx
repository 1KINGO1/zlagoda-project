import {useMutation} from '@tanstack/react-query';
import {authService} from '@/shared/services/auth.service';

export const useLogout = () => {
	return useMutation({
		mutationFn: authService.logout,
	})
}