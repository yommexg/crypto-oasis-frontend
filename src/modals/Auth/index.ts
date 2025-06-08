import {
  Login,
  NewDeviceLogin,
  Register,
  ResetPassword,
  SendForgetOTP,
  SendVerificationLink,
  VerifyForgetOTP,
} from "../index";

export const authModalRoutes = {
  "/login": Login,
  "/send-verification-link": SendVerificationLink,
  "/register": Register,
  "/new-device-login": NewDeviceLogin,
  "/send-forget-otp": SendForgetOTP,
  "/verify-forget-otp": VerifyForgetOTP,
  "/reset-password": ResetPassword,
} as const;

export type ModalPath = keyof typeof authModalRoutes;

export const isAuthModalPath = (path: string): path is ModalPath =>
  path in authModalRoutes;

export const getAuthModalComponent = (path: string) =>
  isAuthModalPath(path) ? authModalRoutes[path] : null;
