import { authService } from '@/shared/services/auth.service'

import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
  })
}
