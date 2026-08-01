export async function requireUser(request: Request): Promise<{ id: string; email: string } | Response> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token) return Response.json({ error: "Authentication required" }, { status: 401 });
  if (!url || !key) return Response.json({ error: "Authentication service is not configured" }, { status: 503 });
  const response = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: `Bearer ${token}` } });
  if (!response.ok) return Response.json({ error: "Invalid or expired session" }, { status: 401 });
  const user = await response.json() as { id?: string; email?: string };
  if (!user.id) return Response.json({ error: "Invalid user identity" }, { status: 401 });
  return { id: user.id, email: user.email ?? "" };
}

export function validState(value: unknown): value is { transactions: unknown[]; budgets: unknown[]; goals: unknown[] } {
  if (!value || typeof value !== "object") return false;
  const x = value as Record<string, unknown>;
  return Array.isArray(x.transactions) && Array.isArray(x.budgets) && Array.isArray(x.goals) && x.transactions.length < 10000 && x.budgets.length < 500 && x.goals.length < 500;
}
