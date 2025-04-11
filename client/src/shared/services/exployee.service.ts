import {API_BASE_URL} from '@/shared/constants/apiBaseUrl';
import {Employee} from '@/shared/entities/Employee';

class EmployeeService {
	async getCurrentEmployeeInfo(): Promise<Employee> {
		const res = await fetch(API_BASE_URL + "employee/me", {
			method: 'GET',
			credentials: "include",
		});
		const data = await res.json();

		if (!res.ok) {
			throw data;
		}

		return data;
	}
}

export const employeeService = new EmployeeService();