export interface UserState {
  user: UserModel;
  account: AccountModel;
  error: ErrorModel;
  post: PostModel
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

export interface PostState {
  users_posts: [PostModel],
  feed_posts: [PostModel],
  liked_posts: [PostModel],
  indv_post: PostModel,
  daily_post: PostModel
}

export interface PostModel {
  id: number;
  body: string;
  post_from: string;
  image?: string;
  total_likes: number;
  total_comments: number;
  created_at: string;
  updated_at: string;
  user_id: number;
}


