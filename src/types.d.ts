interface HoneycombSession extends Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    roles?: string[];
  };
}
