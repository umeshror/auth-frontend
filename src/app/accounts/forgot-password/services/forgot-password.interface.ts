export interface ForgotPassword {
  email: string;
}

export interface ResetPassword {
  email: string;
  code: string;
  new_password: string;
}
