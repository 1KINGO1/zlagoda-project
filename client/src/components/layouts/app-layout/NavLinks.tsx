'use client'

import { cx } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

import { useCurrentEmployee } from '@/shared/hooks/auth/useCurrentEmployee'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavLinks = () => {
  const { data, isSuccess } = useCurrentEmployee()

  return isSuccess ? (
    <ul className='flex gap-2.5'>
      <li>
        <NavLink href='/dashboard'>Home</NavLink>
      </li>
      <li>
        <NavLink href='/dashboard/products'>Products</NavLink>
      </li>
      <li>
        <NavLink href='/dashboard/categories'>Categories</NavLink>
      </li>
      <li>
        <NavLink href='/dashboard/customers'>Customers</NavLink>
      </li>
      <li>
        <NavLink href='/dashboard/store-products'>Store Products</NavLink>
      </li>
      <li>
        <NavLink href='/dashboard/employees'>Employees</NavLink>
      </li>
      <li>
        <NavLink href='/dashboard/receipts'>Receipts</NavLink>
      </li>
    </ul>
  ) : (
    <span>Loading...</span>
  )
}

const NavLink = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname()

  const classNames = cx({
    underline: pathname === href,
  })

  return (
    <Link href={href} className={classNames}>
      {children}
    </Link>
  )
}
