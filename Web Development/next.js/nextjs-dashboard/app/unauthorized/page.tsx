import { signOut } from '@/auth';

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md rounded-lg bg-gray-50 p-8 text-center">
        <h1 className="mb-3 text-2xl font-semibold">Access denied</h1>
        <p className="mb-6 text-sm text-gray-700">
          This app requires the Admin app role in Microsoft Entra ID. Ask your
          administrator to assign the role, then sign in again.
        </p>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-400"
            type="submit"
          >
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
