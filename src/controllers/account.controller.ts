import { Request, Response } from "express";
import { Account } from "../models/Account";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { AccountAttributes } from "../utils/accountTypes";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const {
      user_name,
      email,
      role,
      verified,
      password,
      image_url,
      google_id,
      is_new,
    } = req.body;

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
    if (google_id) {
      const newAccount = await Account.create({
        email: email || "",
        image_url: image_url || "",
        role: role || "user",
        verified: false,
        is_new: is_new || true,
        google_id,
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
    const { user_name, email, image_url, role, verified, is_new, password } =
      req.body;

    const foundAccount = await Account.findByPk(accountId);

    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found." });
    }
    await foundAccount.update({
      ...(user_name !== undefined && { user_name }),
      ...(email !== undefined && { email }),
      ...(image_url !== undefined && { image_url }),
      ...(role !== undefined && { role }),
      ...(verified !== undefined && { verified }),
      ...(is_new !== undefined && { is_new }),
    });

    res.json({ message: "Account updated successfully." });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const FindAccount = async (req: Request, res: Response) => {
  try {
    const { search_params } = req.params;

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

export const checkPassword = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const { password } = req.body;
    const account = (await Account.findByPk(
      accountId
    )) as AccountAttributes | null;
    if (!account) {
      return res.status(404).json({ message: "Cuenta no existente." });
    }
    if (!account.password) {
      return res.status(400).json({ message: "La cuenta no tiene password" });
    }
    const isMatch = await bcrypt.compare(password, account.password);
    console.log(isMatch);
    if (isMatch) {
      res.json({ matching: true });
    } else {
      res.json({ matching: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createNewPassword = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const account = (await Account.findByPk(
      accountId
    )) as AccountAttributes | null;
    if (!account) {
      return res.status(404).json({ message: "Cuenta no existente." });
    }
    const { password } = req.body;
    if (!account.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      account.update({
        password: hashedPassword,
      });
      res.status(200).json({ message: "Password creado correctamente" });
    } else {
      res.status(400).json({ message: "La cuenta ya tiene password" });
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { accountId } = req.params;
    const account = (await Account.findByPk(
      accountId
    )) as AccountAttributes | null;
    if (!account) {
      return res.status(404).json({ message: "Cuenta no existente." });
    }
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "El password es requerido" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    account.update({
      password: hashedPassword,
    });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
