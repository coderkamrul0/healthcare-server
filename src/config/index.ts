import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    expires_in: process.env.EXPIRES_IN,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
    reset_password_secret: process.env.RESET_PASSWORD_TOKEN,
    reset_password_secret_expires_in:
      process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
  },
  reset_password_link: process.env.RESET_PASSWORD_LINK,
  email: process.env.EMAIL,
  app_password: process.env.APP_PASSWORD,
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  payment: {
    sslCommerz_store_id: process.env.SSLCOMMERZE_STORE_ID,
    sslCommerz_store_pass: process.env.SSLCOMMERZE_STORE_PASS,
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
    fail_url: process.env.FAIL_URL,
    ssl_payment_api: process.env.SSLCOMMERZE_PAYMENT_API,
    ssl_validation_api: process.env.SSL_VALIDATION_API,
  },
};
