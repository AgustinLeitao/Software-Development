import SideNav from '@/app/ui/dashboard/sidenav';
import { getAdminAuthorizationFailure } from '@/app/lib/authz';
import { redirect } from 'next/navigation';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const authorizationFailure = await getAdminAuthorizationFailure();

  if (authorizationFailure) {
    redirect(
      authorizationFailure.status === 401 ? '/login' : '/unauthorized',
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}