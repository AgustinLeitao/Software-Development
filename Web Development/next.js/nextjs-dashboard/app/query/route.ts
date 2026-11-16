import postgres from 'postgres';
import {
  authorizationFailureResponse,
  getAdminAuthorizationFailure,
} from '@/app/lib/authz';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  const authorizationFailure = await getAdminAuthorizationFailure();
  if (authorizationFailure) {
    return authorizationFailureResponse(authorizationFailure);
  }

  try {
  	return Response.json(await listInvoices());
  } catch (error) {
    console.error('Failed to fetch query results:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
