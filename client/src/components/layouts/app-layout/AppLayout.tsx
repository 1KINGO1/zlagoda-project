import {PropsWithChildren} from 'react';
import {UserInfo} from './UserInfo';
import {NavLinks} from '@/components/layouts/app-layout/NavLinks';

export function AppLayout({children}: PropsWithChildren) {
	return (
		<div className="container px-4 mx-auto min-h-screen relative">
			<nav className="py-4 flex justify-between">
				<NavLinks/>
				<UserInfo/>
			</nav>
			<main className="relative">
				{children}
			</main>
		</div>
	)
}