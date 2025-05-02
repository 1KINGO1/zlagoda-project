'use client'

import { RecentReceipts } from '@/features/metrics/RecentReceipts'
import { UserInfo } from '@/features/metrics/UserInfo'
import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'

export const Metrics = () => {
  const role = useEmployeeRole();

  return (
    <div>
      <UserInfo />
      {role === "CASHIER" ? <RecentReceipts/> : null}
    </div>
  );
}