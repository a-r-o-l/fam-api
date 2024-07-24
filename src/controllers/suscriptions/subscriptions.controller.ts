import { MercadoPagoConfig, Preference } from "mercadopago";
import { Request, Response } from "express";
import { Subscription } from "../../models/Subscription";
import dayjs from "dayjs";

interface CustomRequest extends Request {
  user?: any;
}

const MpAccessToken = process.env.MP_ACCESS_TOKEN as string;
const successUrl = process.env.MP_SUCCESS_URL as string;
const failureUrl = process.env.MP_FAILURE_URL as string;
const pendingUrl = process.env.MP_PENDING_URL as string;
const notificationUrl = process.env.MP_NOTIFICATION_URL as string;

export const createPreference = async (req: CustomRequest, res: Response) => {
  const { title, unit_price, id } = req.body;
  const accountId = req.user.id;

  const body = {
    items: [
      {
        id,
        title: title,
        unit_price: unit_price,
        quantity: 1,
        description: accountId,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
    },
    auto_return: "approved",
    notification_url: notificationUrl,
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
  if (req.query.type === "payment") {
    const paymentId = req.query["data.id"];
    try {
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${MpAccessToken}`,
          },
        }
      );
      if (response.ok) {
        const payment = await response.json();
        const isApproved = payment.status === "approved";
        const existSubscription = await Subscription.findOne({
          where: { payment_id: payment.id },
        });
        if (!existSubscription && isApproved) {
          await Subscription.create({
            payment_id: payment.id,
            payment_type_id: payment.payment_type_id,
            status: payment.status,
            value: payment.transaction_details.total_paid_amount,
            date_approved: payment.date_approved,
            start_date: dayjs(payment.date_approved).format("YYYY/MM/DD"),
            end_date: dayjs(payment.date_approved)
              .add(1, "month")
              .format("YYYY/MM/DD"),
            ip: payment.additional_info.ip_address,
            account_id: parseInt(payment.items[0].description),
            payer: payment.payer,
          });
        }
        return res.sendStatus(200);
      } else {
        return res.sendStatus(response.status);
      }
    } catch (error) {
      console.log("Error -> ", error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(200);
  }
};
