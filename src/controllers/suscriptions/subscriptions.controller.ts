import { MercadoPagoConfig, Preference } from "mercadopago";
import { Request, Response } from "express";
import { Subscription } from "../../models/Subscription";

interface CustomRequest extends Request {
  user?: any;
}

export const createPreference = async (req: Request, res: Response) => {
  const { title, unit_price, description, id } = req.body;

  const body = {
    items: [
      {
        id,
        title: title,
        unit_price: unit_price,
        quantity: 1,
        description: description,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success:
        "https://fam-client-production.up.railway.app/subscriptions/success",
      failure:
        "https://fam-client-production.up.railway.app/subscriptions/failure",
      pending:
        "https://fam-client-production.up.railway.app/subscriptions/pending",
    },
    auto_return: "approved",
  };

  try {
    const client = new MercadoPagoConfig({
      accessToken:
        "APP_USR-5726323322571746-071718-d77d075e705b6fb36c3d9c6399cc8940-1907117420",
    });

    const preference = new Preference(client);
    const result = await preference.create({
      body,
    });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createSubscription = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const { value, start_date, end_date } = req.body;

  try {
    const newSubscription = await Subscription.create({
      value,
      start_date,
      end_date,
      account_id: accountId,
    });
    res.json(newSubscription);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getSubscriptions = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const subscriptions = await Subscription.findAll({
      where: { account_id: accountId },
    });
    res.json(subscriptions);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
