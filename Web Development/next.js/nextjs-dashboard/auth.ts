import NextAuth from 'next-auth';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';
import { authConfig } from './auth.config';

const microsoftEntraId = MicrosoftEntraID({
  issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
});

microsoftEntraId.authorization = {
  params: { scope: 'openid profile email' },
};
microsoftEntraId.profile = (profile) => ({
  id: profile.sub,
  name: profile.name,
  email: profile.email,
  image: null,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [microsoftEntraId],
});