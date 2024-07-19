import { MercadoPagoConfig, Preference } from "mercadopago";
import { Request, Response } from "express";
import { Subscription } from "../../models/Subscription";

interface CustomRequest extends Request {
  user?: any;
}

const MpAccessToken = process.env.MP_ACCESS_TOKEN as string;
const successUrl = process.env.MP_SUCCESS_URL as string;
const failureUrl = process.env.MP_FAILURE_URL as string;
const pendingUrl = process.env.MP_PENDING_URL as string;

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
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
    },
    auto_return: "approved",
    webhook: "https://fam-api-production.up.railway.app/webhook",
  };

  try {
    const client = new MercadoPagoConfig({
      accessToken: MpAccessToken,
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
      order: [["end_date", "DESC"]],
    });
    res.json(subscriptions);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteSubscriptions = async (
  req: CustomRequest,
  res: Response
) => {
  const accountId = req.user.id;
  const { subscriptionId } = req.params;
  try {
    await Subscription.destroy({
      where: { id: subscriptionId, account_id: accountId },
    });
    res.json({ message: "Suscripcion eliminada correctamente" });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const webhook = async (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "webhook received" });
};
