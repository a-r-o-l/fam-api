import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Account } from "../../models/Account";
import { RefreshToken } from "../../models/RefreshToken";
import { Model } from "sequelize";
import { Subscription } from "../../models/Subscription";
import dayjs from "dayjs";

interface AccountInstance extends Model {
  id: number;
  user_name: string;
  password: string;
  email: string;
  role: string;
  verified: boolean;
  image_url: string;
  Subscriptions?: (typeof Subscription)[] | [];
  is_new?: boolean;
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
  const today = dayjs();
  let subscriptionStatus = "expired"; // Default status

  try {
    const { user_name, password, google_id } = req.body;

    const searchCriteria = google_id ? { google_id: google_id } : { user_name };

    const user = (await Account.findOne({
      where: searchCriteria,
      include: [{ model: Subscription, as: "Subscriptions" }],
    })) as AccountInstance | null;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.Subscriptions?.length) {
      user.Subscriptions.sort((a: any, b: any) => {
        const endDateA = dayjs(a.end_date).valueOf();
        const endDateB = dayjs(b.end_date).valueOf();
        return endDateB - endDateA;
      });
      const mostRecentSubscription: any = user.Subscriptions[0];
      const endDate = dayjs(mostRecentSubscription.end_date);
      const today = dayjs();

      if (today.isBefore(endDate)) {
        subscriptionStatus = "active";
      }
    }

    if (!google_id) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        verified: user.verified,
        role: user.role,
        image_url: user.image_url,
        Subscriptions: user.Subscriptions,
        status: subscriptionStatus,
        is_new: user.is_new,
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
  let subscriptionStatus = "expired";
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

    const user = (await Account.findByPk(decoded.id, {
      include: [{ model: Subscription, as: "Subscriptions" }],
    })) as AccountInstance | null;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.Subscriptions?.length) {
      user.Subscriptions.sort((a: any, b: any) => {
        const endDateA = dayjs(a.end_date).valueOf();
        const endDateB = dayjs(b.end_date).valueOf();
        return endDateB - endDateA;
      });
      const mostRecentSubscription: any = user.Subscriptions[0];
      const endDate = dayjs(mostRecentSubscription.end_date);
      const today = dayjs();

      if (today.isBefore(endDate)) {
        subscriptionStatus = "active";
      }
    }

    const newAccessToken = jwt.sign(
      {
        id: user.id,
        user_name: user.user_name,
        email: user.email,
        verified: user.verified,
        role: user.role,
        image_url: user.image_url,
        Subscriptions: user.Subscriptions,
        status: subscriptionStatus,
        is_new: user.is_new,
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
