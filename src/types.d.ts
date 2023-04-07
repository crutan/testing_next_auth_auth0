import type { Profile, Session } from "next-auth";

export interface HoneycombProfile extends Profile {
  user_roles?: string[];
}
export interface HoneycombSession extends Session {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    image?: string;
    roles?: string[];
  };
  accessToken?: string;
  error?: string;
}
