import { AuthLayout } from "@/features/auth/AuthLayout";
import {PropsWithChildren} from 'react';

export default function Layout({ children }: PropsWithChildren) {
	return (
		<AuthLayout>
			{children}
		</AuthLayout>
	);
}