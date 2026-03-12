import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { isValidUrl, isValidImageUrl, sanitizeText } from "@/lib/security";

export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return Response.json({
        success: false,
        message: "You must be logged in to edit a Taptree",
      }, { status: 401 });
    }

    const { handle } = await params;
    const body = await request.json();
    const { link, pic, desc } = body;

    // Validate required fields
    if (!Array.isArray(link) || link.length === 0) {
      return Response.json({
        success: false,
        message: "At least one link is required",
      }, { status: 400 });
    }

    if (!pic || typeof pic !== "string") {
      return Response.json({
        success: false,
        message: "Profile picture URL is required",
      }, { status: 400 });
    }

    // Validate profile picture URL
    if (!isValidImageUrl(pic)) {
      return Response.json({
        success: false,
        message: "Please enter a valid image URL (http or https)",
      }, { status: 400 });
    }

    if (!desc || typeof desc !== "string") {
      return Response.json({
        success: false,
        message: "Bio/description is required",
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("taptree");
    const collection = db.collection("links");

    // Find the taptree and verify ownership
    const taptree = await collection.findOne({ handle: handle.toLowerCase() });

    if (!taptree) {
      return Response.json({
        success: false,
        message: "Taptree not found",
      }, { status: 404 });
    }

    // Check ownership
    if (taptree.userId !== session.user.id) {
      return Response.json({
        success: false,
        message: "You don't have permission to edit this Taptree",
      }, { status: 403 });
    }

    // Sanitize and validate links (filter out invalid URLs)
    // Preserve existing click counts for links that haven't changed
    const existingLinks = taptree.link || [];
    const sanitizedLinks = link
      .filter((l) => l.link && l.linktext && isValidUrl(l.link))
      .map((l) => {
        // Try to find matching existing link to preserve its click count
        const existing = existingLinks.find(
          (e) => e.link === l.link.trim() && e.linktext === l.linktext
        );
        return {
          link: sanitizeText(l.link.trim(), 2000),
          linktext: sanitizeText(l.linktext, 100),
          clicks: existing ? (existing.clicks || 0) : 0,
        };
      });

    if (sanitizedLinks.length === 0) {
      return Response.json({
        success: false,
        message: "Please add at least one valid link (http or https URLs only)",
      }, { status: 400 });
    }

    // Update the document with sanitized inputs
    const result = await collection.updateOne(
      { handle: handle.toLowerCase() },
      {
        $set: {
          link: sanitizedLinks,
          pic: sanitizeText(pic.trim(), 2000),
          desc: sanitizeText(desc.trim(), 500),
          updatedAt: new Date(),
        },
      }
    );

    return Response.json({
      success: true,
      message: "Taptree updated successfully!",
      result,
    }, { status: 200 });

  } catch (error) {
    console.error("Error updating Taptree:", error);
    return Response.json({
      success: false,
      message: "Something went wrong. Please try again.",
    }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return Response.json({
        success: false,
        message: "You must be logged in",
      }, { status: 401 });
    }

    const { handle } = await params;

    const client = await clientPromise;
    const db = client.db("taptree");
    const collection = db.collection("links");

    // Find the taptree
    const taptree = await collection.findOne({ handle: handle.toLowerCase() });

    if (!taptree) {
      return Response.json({
        success: false,
        message: "Taptree not found",
      }, { status: 404 });
    }

    // Check ownership
    if (taptree.userId !== session.user.id) {
      return Response.json({
        success: false,
        message: "You don't have permission to view this Taptree's data",
      }, { status: 403 });
    }

    return Response.json({
      success: true,
      data: {
        handle: taptree.handle,
        link: taptree.link,
        pic: taptree.pic,
        desc: taptree.desc,
      },
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching Taptree:", error);
    return Response.json({
      success: false,
      message: "Something went wrong. Please try again.",
    }, { status: 500 });
  }
}
