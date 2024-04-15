import axios from "axios";
import config from "../../../config";
import { prisma } from "../../../shared/prisma";
import { SSLService } from "../SSL/ssl.service";

const initPayment = async (appointmentId: string) => {
  const paymentData = await prisma.payment.findUniqueOrThrow({
    where: {
      appointmentId,
    },
    include: {
      appointment: {
        include: { patient: true },
      },
    },
  });

  const initPaymentData = {
    amount: paymentData.amount,
    transactionId: paymentData.transactionId,
    name: paymentData.appointment.patient.name,
    email: paymentData.appointment.patient.email,
    address: paymentData.appointment.patient.address,
    phone: paymentData.appointment.patient.contactNumber,
  };

  const result = await SSLService.initPayment(initPaymentData);

  return { paymentURL: result.GatewayPageURL };
};

export const PaymentService = {
  initPayment,
};