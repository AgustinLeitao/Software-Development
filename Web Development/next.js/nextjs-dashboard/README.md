## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Microsoft Entra ID authentication

Sign-in is handled by Auth.js using Microsoft Entra ID. The dashboard, invoice
server actions, and `/query` and `/seed` endpoints require the `Admin` app role
from the Entra ID token.

### Entra app registration

1. Register an application in the Entra admin center. Use the tenant that owns
   the application and choose the account types appropriate for your practice.
2. Under **Authentication**, add these Web redirect URIs:
   - `http://localhost:3000/api/auth/callback/microsoft-entra-id`
   - `https://<your-vercel-domain>/api/auth/callback/microsoft-entra-id`
3. Under **Certificates & secrets**, create a client secret. Store its value
   securely;
4. Under **App roles**, create an enabled role with:
   - Display name: `Admin`
   - Allowed member types: `Users/Groups`
   - Value: `Admin`
5. In **Enterprise applications**, open this app, select **Users and groups**,
   and assign your account or group the `Admin` role.

### Environment variables

Set these in `.env.local` for local development and in the Vercel project
environment settings for each deployment environment:

```env
AUTH_SECRET=<a-long-random-secret>
AUTH_MICROSOFT_ENTRA_ID_ID=<application-client-id>
AUTH_MICROSOFT_ENTRA_ID_SECRET=<client-secret-value>
AUTH_MICROSOFT_ENTRA_ID_ISSUER=https://login.microsoftonline.com/<directory-tenant-id>/v2.0
POSTGRES_URL=<your-postgres-connection-string>
```

Use the tenant-specific issuer shown above, not the `common` issuer, so sign-in
is limited to your Entra tenant. After setting the variables and role assignment,
restart the local server and sign out and back in to refresh the role claim.

The sign-in action requests `prompt=select_account` so Entra shows an account
chooser when you sign in again. Signing out of the app clears its Auth.js
session; it does not sign you out of Microsoft everywhere.

See [VERCEL_ENTRA_DEPLOYMENT.md](./VERCEL_ENTRA_DEPLOYMENT.md) for the Vercel
environment setup, redirect URI configuration, and deployment checklist.
