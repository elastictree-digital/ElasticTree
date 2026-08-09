import { signOut } from "@/auth";
import { isSsoEnabled } from "@/lib/auth/users";

export async function POST() {
  if (!isSsoEnabled()) {
    // Still allow logout of Auth.js session if present
  }
  await signOut({ redirect: false });
  return Response.json({ ok: true });
}
