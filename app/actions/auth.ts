"use server";

import { signIn } from "@/auth";
import { safeCallbackUrl } from "@/lib/safe-callback-url";

export async function googleSignInAction(formData: FormData) {
  const callbackUrl = safeCallbackUrl(formData.get("callbackUrl"));
  await signIn("google", { redirectTo: callbackUrl });
}
