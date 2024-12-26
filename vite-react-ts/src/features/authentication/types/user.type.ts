export interface IUser {
  avatar: string;
  banner: string;

  name: string;
  nickname: string;
  phone_number: string;
  address: string;
  date_of_birth: string;
  email_address: string;
  gender: string;
  bio: string;

  link_website: string;
  link_instagram: string;
  link_facebook: string;
  link_twitter: string;
  link_linkedin: string;
  link_pinterest: string;
  link_youtube: string;
  link_github: string;

  work: string;
  education: string;
  skills: string;
}

export type SocialMediaType = "facebook" | "google" | "github";
