import clientPromise from "@/lib/mongodb";

// Simple in-memory rate limiter for click tracking
// Prevents bots from inflating click counts
const clickRateMap = new Map();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const MAX_CLICKS_PER_WINDOW = 30;

// Clean up stale entries every 60 seconds
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of clickRateMap) {
    if (now - entry.start > RATE_LIMIT_WINDOW) {
      clickRateMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

function isRateLimited(ip) {
  const now = Date.now();
  const entry = clickRateMap.get(ip);

  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    clickRateMap.set(ip, { start: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > MAX_CLICKS_PER_WINDOW) {
    return true;
  }
  return false;
}

/**
 * POST /api/track-click
 * Track a click on a specific link in a Taptree.
 * No authentication required — this is called by public visitors.
 * 
 * Body: { handle: string, linkIndex: number }
 */
export async function POST(request) {
  try {
    // Rate limit by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { success: false, message: "Too many requests. Please slow down." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { handle, linkIndex } = body;

    // Validate inputs
    if (!handle || typeof handle !== "string") {
      return Response.json(
        { success: false, message: "Handle is required" },
        { status: 400 }
      );
    }

    if (typeof linkIndex !== "number" || linkIndex < 0 || !Number.isInteger(linkIndex)) {
      return Response.json(
        { success: false, message: "Valid link index is required" },
        { status: 400 }
      );
    }

    const sanitizedHandle = handle.trim().toLowerCase();

    const client = await clientPromise;
    const db = client.db("taptree");
    const collection = db.collection("links");

    // Verify the taptree exists and the linkIndex is within bounds
    const taptree = await collection.findOne(
      { handle: sanitizedHandle },
      { projection: { link: 1 } }
    );

    if (!taptree) {
      return Response.json(
        { success: false, message: "Taptree not found" },
        { status: 404 }
      );
    }

    if (!taptree.link || linkIndex >= taptree.link.length) {
      return Response.json(
        { success: false, message: "Link not found" },
        { status: 404 }
      );
    }

    // Atomically increment the click count for the specific link AND total clicks
    await collection.updateOne(
      { handle: sanitizedHandle },
      {
        $inc: {
          [`link.${linkIndex}.clicks`]: 1,
          totalClicks: 1,
        },
      }
    );

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error tracking click:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
