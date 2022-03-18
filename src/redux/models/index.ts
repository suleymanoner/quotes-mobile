export interface Category {
    id: string,
    title: string,
    icon: string,   
}

export interface Account {
    id: number,
    name: string,
    status: string,
    created_at: Date,
    updated_at: Date
}

export interface DailyPost {
    id: number,
    body: string,
    post_from: string,
    image: string
}

export interface User {
    name: string,
    surname: string,
    bio?: string,
    email: string,
    password: string,
    status: string,
    role: string,
    profile_photo?: string,
    created_at: Date,
    updated_at: Date,
    token?: string,
    token_created_at: Date,
    account_id: number
}

export interface Post {
    id: number,
    body: string,
    post_from: string,
    image?: string,
    total_like?: number,
    total_comments?: number,
    created_at: Date,
    updated_at: Date,
    user_id: number
}


