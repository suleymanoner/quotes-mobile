export interface UserState {
  user: UserModel;
  account: AccountModel;
  error: ErrorModel;
}

export interface ErrorModel {
  message: string
}

export interface AccountModel {
  id: number;
  name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface DailyPostModel {
  id: number;
  body: string;
  post_from: string;
  image: string;
}

export interface UserModel {
  id: number;
  name: string;
  surname: string;
  bio?: string;
  email: string;
  password: string;
  status: string;
  role: string;
  profile_photo?: string;
  created_at: Date;
  updated_at: Date;
  token?: string;
  token_created_at: Date;
  account_id: number;
}

export interface PostModel {
  id: number;
  body: string;
  post_from: string;
  image?: string;
  total_like?: number;
  total_comments?: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
}
