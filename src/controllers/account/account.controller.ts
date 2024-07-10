import { Request, Response } from "express";
import { Account } from "../../models/Account";
import bcrypt from "bcrypt";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { user_name, email, image_url, role, verified, password } = req.body;
    const existingAccount = await Account.findOne({
      where: {
        $or: [{ email: req.body?.email }, { user_name: req.body?.user_name }],
      },
    });

    if (existingAccount) {
      return res.status(400).json({
        message: "Account already exists with the given email or username.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAccount = await Account.create({
      user_name,
      email,
      image_url,
      role,
      verified,
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
