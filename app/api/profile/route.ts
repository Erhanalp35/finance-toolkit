import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { financeStates } from "../../../db/schema";
import { requireUser, validState } from "../_auth";

const empty = { transactions: [], budgets: [], goals: [] };
export async function GET(request: Request) {
  const user = await requireUser(request); if (user instanceof Response) return user;
  try { const [row] = await getDb().select().from(financeStates).where(eq(financeStates.userId, user.id)).limit(1); return Response.json({ data: row ? JSON.parse(row.payload) : empty, email: user.email }); }
  catch { return Response.json({ error: "Financial records are temporarily unavailable" }, { status: 503 }); }
}
export async function PUT(request: Request) {
  const user = await requireUser(request); if (user instanceof Response) return user;
  let body: unknown; try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON body" }, { status: 400 }); }
  const data = (body as { data?: unknown })?.data; if (!validState(data)) return Response.json({ error: "Invalid financial data" }, { status: 422 });
  try { await getDb().insert(financeStates).values({ userId: user.id, payload: JSON.stringify(data), updatedAt: new Date().toISOString() }).onConflictDoUpdate({ target: financeStates.userId, set: { payload: JSON.stringify(data), updatedAt: new Date().toISOString() } }); return Response.json({ ok: true }); }
  catch { return Response.json({ error: "Changes could not be saved" }, { status: 503 }); }
}
