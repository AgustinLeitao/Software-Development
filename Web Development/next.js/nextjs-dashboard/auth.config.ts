import type { NextAuthConfig } from 'next-auth';
 
function getRoles(value: unknown): string[] {
  if (
    !Array.isArray(value) ||
    !value.every((role): role is string => typeof role === 'string')
  ) {
    return [];
  }

  return value;
}

function getTenantId(issuer: string | undefined): string | null {
  if (!issuer) return null;

  try {
    const [tenantId, version] = new URL(issuer).pathname
      .split('/')
      .filter(Boolean);
    if (
      !tenantId ||
      version !== 'v2.0' ||
      ['common', 'consumers', 'organizations'].includes(tenantId.toLowerCase())
    ) {
      return null;
    }

    return tenantId.toLowerCase();
  } catch {
    return null;
  }
}

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn({ profile }) {
      const tenantId = getTenantId(
        process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      );
      return (
        typeof profile?.tid === 'string' &&
        tenantId !== null &&
        profile.tid.toLowerCase() === tenantId
      );
    },
    jwt({ token, profile }) {
      if (profile) {
        token.roles = getRoles(profile.roles);
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.roles = getRoles(token.roles);
      }

      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isLoginPage = nextUrl.pathname === '/login';
      const isUnauthorizedPage = nextUrl.pathname === '/unauthorized';
      const isAdmin = auth?.user?.roles?.includes('Admin') ?? false;

      if (isOnDashboard) {
        if (isAdmin) return true;
        if (auth?.user) {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        return false;
      }

      if (isUnauthorizedPage) return true;

      if (isLoginPage && auth?.user) {
        return Response.redirect(
          new URL(isAdmin ? '/dashboard' : '/unauthorized', nextUrl),
        );
      }

      if (auth?.user) {
        return Response.redirect(
          new URL(isAdmin ? '/dashboard' : '/unauthorized', nextUrl),
        );
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;