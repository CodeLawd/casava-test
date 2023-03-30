import { prisma } from "@/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

type response = {
  success: boolean;
  data?: any;
  message?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<response>) {
  const { email, password, username } = req.body;

  if (req.method === "POST") {
    const isRegistered = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isRegistered) {
      return res.status(400).json({
        success: false,
        message: "There is already a user with that email address.",
      });
    }

    // Hash users password
    const hash = await bcrypt.hash(password, 10);

    // Create user account
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hash,
      },
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  }
}
