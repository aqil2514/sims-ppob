export interface UserPayload {
  email: string;
  memberCode: string;
  iat: number;
  exp: number;
}

export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

export interface Balance{
  balance: number;
}