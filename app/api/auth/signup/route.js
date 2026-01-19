import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { validateEmail, validatePassword, sanitizeText } from "@/lib/security";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate required fields
    if (!email || !password || !name) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return Response.json(
        { success: false, message: emailValidation.error },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return Response.json(
        { success: false, message: passwordValidation.error },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2 || name.trim().length > 50) {
      return Response.json(
        { success: false, message: "Name must be between 2 and 50 characters" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("taptree");
    const usersCollection = db.collection("users");

    // Check if email already exists
    const existingUser = await usersCollection.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return Response.json(
        { success: false, message: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user with sanitized inputs
    const newUser = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: sanitizeText(name.trim(), 50),
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);

    return Response.json(
      {
        success: true,
        message: "Account created successfully!",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
