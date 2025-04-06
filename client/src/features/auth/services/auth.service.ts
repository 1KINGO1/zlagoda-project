import {LoginFormSchemaType} from '@/shared/schemas/LoginForm.schema';
import {API_BASE_URL} from '@/shared/constants/apiBaseUrl';

class AuthService {
	async login(loginSchema: LoginFormSchemaType) {
		const res = await fetch(API_BASE_URL + "auth/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(loginSchema),
		});
		const data = await res.json();

		if (!res.ok) {
			throw data;
		}

		return data;
	}
}

export const authService = new AuthService();