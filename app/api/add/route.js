
import clientPromise from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import { 
  isValidUrl, 
  isValidImageUrl, 
  sanitizeText, 
  validateHandle 
} from "@/lib/security";

export async function POST(request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return Response.json({
        success: false,
        error: true,
        message: "You must be logged in to create a Taptree",
        result: null,
      }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    const { handle, link, pic, desc } = body;

    // Validate handle with security checks
    const handleValidation = validateHandle(handle);
    if (!handleValidation.valid) {
      return Response.json({
        success: false,
        error: true,
        message: handleValidation.error,
        result: null,
      }, { status: 400 });
    }

    const sanitizedHandle = handle.trim().toLowerCase();

    if (!Array.isArray(link) || link.length === 0) {
      return Response.json({
        success: false,
        error: true,
        message: "At least one link is required",
        result: null,
      }, { status: 400 });
    }

    if (!pic || typeof pic !== "string") {
      return Response.json({
        success: false,
        error: true,
        message: "Profile picture URL is required",
        result: null,
      }, { status: 400 });
    }

    // Validate profile picture URL
    if (!isValidImageUrl(pic)) {
      return Response.json({
        success: false,
        error: true,
        message: "Please enter a valid image URL (http or https)",
        result: null,
      }, { status: 400 });
    }

    if (!desc || typeof desc !== "string") {
      return Response.json({
        success: false,
        error: true,
        message: "Bio/description is required",
        result: null,
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("taptree");
    const collection = db.collection("links");

    // Check if handle already exists
    const existingDoc = await collection.findOne({ handle: sanitizedHandle });

    if (existingDoc) {
      return Response.json({
        success: false,
        error: true,
        message: "This handle is already taken. Please choose another one.",
        result: null,
      }, { status: 409 });
    }

    // Sanitize and validate links (filter out invalid URLs)
    const sanitizedLinks = link
      .filter((l) => l.link && l.linktext && isValidUrl(l.link))
      .map((l) => ({
        link: sanitizeText(l.link.trim(), 2000),
        linktext: sanitizeText(l.linktext, 100),
      }));

    if (sanitizedLinks.length === 0) {
      return Response.json({
        success: false,
        error: true,
        message: "Please add at least one valid link (http or https URLs only)",
        result: null,
      }, { status: 400 });
    }

    // Create the document with sanitized inputs
    const document = {
      handle: sanitizedHandle,
      link: sanitizedLinks,
      pic: sanitizeText(pic.trim(), 2000),
      desc: sanitizeText(desc.trim(), 500),
      userId: session.user.id, // Link to user
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(document);

    return Response.json({
      success: true,
      error: false,
      message: "Taptree created successfully!",
      result: result,
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating Taptree:", error);
    return Response.json({
      success: false,
      error: true,
      message: "Something went wrong. Please try again later.",
      result: null,
    }, { status: 500 });
  }
}