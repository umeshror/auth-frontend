export interface User {
  first_name?: string;
  last_name?: string;
  access: string;
  refresh: string;
}

export interface UserLogin {
  first_name?: string;
  last_name?: string;
  access: string;
  refresh: string;
}

export interface GoogleUser {
  first_name?: string;
  last_name?: string;
  profile_picture_url?: string;
  email: string;
  token: string;
}
