import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Account } from "../../models/Account";
import { RefreshToken } from "../../models/RefreshToken";
import { Model } from "sequelize";

interface AccountInstance extends Model {
  id: number;
  user_name: string;
  password: string;
  email: string;
  role: string;
  verified: boolean;
}

interface IRefreshToken {
  id?: number;
  user_id: number;
  token: string;
  expiry_date: Date;
}
const secret = process.env.JWT_SECRET as string;
const refreshSecret = process.env.REFRESH_SECRET as string;

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;

    const user = (await Account.findOne({
      where: { user_name },
    })) as AccountInstance | null;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        verified: user.verified,
        role: user.role,
      },
      secret,
      { expiresIn: "5h" }
    );

    const refreshToken = jwt.sign({ id: user.id }, refreshSecret, {
      expiresIn: "30d",
    });

    await RefreshToken.create({
      user_id: user.id,
      token: refreshToken,
      expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRefreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh Token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret) as JwtPayload;

    const storedToken = (await RefreshToken.findOne({
      where: { token: refreshToken, user_id: decoded.id },
    })) as IRefreshToken | null;

    if (!storedToken) {
      return res
        .status(403)
        .json({ message: "Refresh Token is not in database!" });
    }

    if (Date.now() > new Date(storedToken.expiry_date).getTime()) {
      return res.status(403).json({ message: "Refresh Token has expired" });
    }

    const user = (await Account.findByPk(decoded.id)) as AccountInstance | null;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        user_name: user.user_name,
        verified: user.verified,
        role: user.role,
      },
      secret,
      { expiresIn: "5h" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
