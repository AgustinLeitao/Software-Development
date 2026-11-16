import { auth } from '@/auth';

export type AdminAuthorizationFailure = {
  status: 401 | 403;
  message: string;
};

export class AuthorizationError extends Error {
  status: AdminAuthorizationFailure['status'];

  constructor(failure: AdminAuthorizationFailure) {
    super(failure.message);
    this.name = 'AuthorizationError';
    this.status = failure.status;
  }
}

export async function getAdminAuthorizationFailure(): Promise<AdminAuthorizationFailure | null> {
  const session = await auth();

  if (!session?.user) {
    return { status: 401, message: 'Authentication required.' };
  }

  if (!session.user.roles.includes('Admin')) {
    return { status: 403, message: 'The Admin app role is required.' };
  }

  return null;
}

export function authorizationFailureResponse(
  failure: AdminAuthorizationFailure,
) {
  return Response.json({ error: failure.message }, { status: failure.status });
}

export async function requireAdmin() {
  const failure = await getAdminAuthorizationFailure();

  if (failure) {
    throw new AuthorizationError(failure);
  }
}
