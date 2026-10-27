import type { Metadata } from "next";
import { AuthLegalNote, AuthSplitFrame } from "@/components/auth-split-frame";
import { GoogleSignInButton } from "@/components/google-sign-in-button";
import { isGoogleOAuthConfigured } from "@/lib/google-oauth";
import { safeCallbackUrl } from "@/lib/safe-callback-url";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; expired?: string; error?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl);
  const googleConfigured = isGoogleOAuthConfigured();

  return (
    <main>
      <AuthSplitFrame
        title="Sign in to Ziki"
        description="Use your Google account to report, vote on and track issues."
        showAgentDocs
      >
        {params.expired && !params.error ? (
          <p className="rounded-xl bg-zk-warn-bg p-3 text-sm text-zk-warn-fg" role="status">
            Your session ended. Sign in again to continue.
          </p>
        ) : null}
        {params.error ? (
          <p className="rounded-xl bg-zk-bad-bg p-3 text-sm text-zk-bad-fg" role="alert">
            Unable to complete Google sign-in. Please try again.
          </p>
        ) : null}
        <GoogleSignInButton callbackUrl={callbackUrl} disabled={!googleConfigured} />
        {!googleConfigured ? (
          <p className="text-center text-xs text-zk-muted" role="status">
            Google sign-in is shown for this preview. Add Google OAuth credentials to enable it.
          </p>
        ) : null}
        <AuthLegalNote />
      </AuthSplitFrame>
    </main>
  );
}
