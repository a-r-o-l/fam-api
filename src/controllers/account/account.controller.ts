import { Request, Response } from "express";
import { Account } from "../../models/Account";
import bcrypt from "bcrypt";
import { Op, where } from "sequelize";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { user_name, email, role, verified, password, image_url, googleId } =
      req.body;

    const existingAccount = await Account.findOne({
      where: {
        [Op.or]: [
          ...(email ? [{ email }] : []),
          ...(user_name ? [{ user_name }] : []),
        ],
      },
    });

    if (existingAccount) {
      return res.status(400).json({
        message: "Account already exists with the given email or username.",
      });
    }
    if (googleId) {
      const newAccount = await Account.create({
        email: email || "",
        image_url: image_url || "",
        role: role || "user",
        verified: verified || false,
        googleId: googleId,
        user_name,
      });
      return res.json({ newAccount });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAccount = await Account.create({
      user_name,
      email: email || "",
      image_url: image_url || "",
      role: role || "user",
      verified: verified || false,
      password: hashedPassword,
    });

    res.json({ newAccount });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;

    const account = await Account.findByPk(accountId);

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }

    await account.destroy();

    res.json({ message: "Account deleted successfully." });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const { user_name, email, image_url, role, verified } = req.body;

    const foundAccount = await Account.findByPk(accountId);

    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found." });
    }
    await foundAccount.update({
      user_name,
      email,
      image_url,
      role,
      verified,
    });

    res.json({ message: "Account updated successfully." });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const FindAccount = async (req: Request, res: Response) => {
  try {
    const { search_params } = req.params;
    console.log(search_params);

    const user = await Account.findOne({
      where: { user_name: search_params || "" },
    });

    if (!user) {
      res.json({ status: false, user: null });
    } else {
      res.json({ status: true, user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
