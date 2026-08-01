let cache: { rates: Record<string, number>; date: string; at: number } | null = null;
export async function GET() {
  if (cache && Date.now() - cache.at < 3_600_000) return Response.json(cache);
  try {
    const response = await fetch("https://api.frankfurter.app/latest?from=EUR&to=USD,GBP,TRY", { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error("Rate source unavailable");
    const body = await response.json() as { rates: Record<string, number>; date: string };
    cache = { rates: { EUR: 1, ...body.rates }, date: body.date, at: Date.now() };
    return Response.json(cache, { headers: { "Cache-Control": "public, max-age=3600" } });
  } catch { return Response.json(cache ?? { error: "Live rates are temporarily unavailable" }, { status: cache ? 200 : 503 }); }
}
