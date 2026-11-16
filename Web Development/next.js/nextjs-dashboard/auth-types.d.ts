import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      roles: string[];
    } & NonNullable<DefaultSession['user']>;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    roles?: string[];
  }
}
