import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type response = {
  success: boolean;
  data?: any;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<response>) {
  const { email, password } = req.body;

  // Check if user already exist in database
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // If not, return an error message
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "There is no user with that email address.",
    });
  }

  // If user exists, check if password is correct
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword)
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });

  // Generate jwt user token with users' email and username
  const token = jwt.sign({ username: user.username, email: user.email }, process.env.SECRET_KEY as string, {
    expiresIn: "5d",
  });

  return res.status(200).json({
    success: true,
    data: {
      user,
      token,
    },
  });
}
