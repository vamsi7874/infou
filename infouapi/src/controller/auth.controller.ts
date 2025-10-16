import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { insertOne, findOne } from "../common/mongo";

// JWT config
const JWT_SECRET = process.env.JWT_SECRET || "info_u_user_token";

class RES {
  message: string;
  data: any;
  constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

exports.signUp = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const mobile = 9000090009;

    if (!email || !mobile || !password) {
      return {
        message: `Required: ${email ? "" : "email"} ${
          mobile ? "" : ",mobile"
        } ${password ? "" : ",password"}`.replace(/^,/, ""),
        data: null,
      };
    }

    const existingUser = await findOne("users", "email", email);
    if (existingUser) {
      return {
        message: "User already exists",
        data: null,
        code: 204,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      mobile,
      password: hashedPassword,
      access_level: "user",
    };

    const dbResult = await insertOne("users", newUser);

    if (!dbResult) {
      return {
        message: "Failed to create user",
        data: null,
        code: 400,
      };
    }

    const { password: _, ...safeUser } = newUser;
    return {
      message: "User created successfully",
      data: { user: safeUser },
      code: 201,
    };
  } catch (error: any) {
    console.error("Signup error:", error);
    return {
      message: "Internal server error",
      data: error.message || null,
      code: 500,
    };
  }
};

exports.validateLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return new RES("Email and password are required", null);
    }

    const user = await findOne("users", "email", email);
    if (!user) {
      return new RES("Invalid email or password", null);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new RES("Invalid email or password", null);
    }
    const payload = {
      id: user._id,
      email: user.email,
      access_level: user.access_level,
    };
    const options: SignOptions = {
      expiresIn: "24h",
    };

    const token = jwt.sign(payload, JWT_SECRET, options);

    const { password: _, ...safeUser } = user;

    return new RES("Login successful", {
      token,
      user: safeUser,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return new RES("Internal server error", error.message);
  }
};
