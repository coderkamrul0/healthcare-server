import axios from "axios";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const initPayment = async (paymentData: any) => {
  try {
    const data = {
      store_id: config.payment.sslCommerz_store_id,
      store_passwd: config.payment.sslCommerz_store_pass,
      total_amount: paymentData.amount,
      currency: "BDT",
      tran_id: paymentData.transactionId,
      success_url: config.payment.success_url,
      fail_url: config.payment.fail_url,
      cancel_url: config.payment.cancel_url,
      ipn_url: "http://localhost:3030/ipn",
      shipping_method: "N/A",
      product_name: "Appointment.",
      product_category: "Health Service",
      product_profile: "general",
      cus_name: paymentData.name,
      cus_email: paymentData.email,
      cus_add1: paymentData.address,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "Bangladesh",
      cus_phone: paymentData.phone,
      cus_fax: "N/A",
      ship_name: "N/A",
      ship_add1: "N/A",
      ship_add2: "N/A",
      ship_city: "N/A",
      ship_state: "N/A",
      ship_postcode: "N/A",
      ship_country: "Bangladesh",
    };

    const response = await axios({
      method: "post",
      url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Error.");
  }
};

const validatePayment = async (payload: any) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${config.payment.ssl_validation_api}?val_id=${payload.val_id}&store_id=${config.payment.sslCommerz_store_id}&store_passwd=${config.payment.sslCommerz_store_pass}&format=json`,
    });

    return response.data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment Validation Failed.");
  }
};

export const SSLService = {
  initPayment,
  validatePayment,
};
