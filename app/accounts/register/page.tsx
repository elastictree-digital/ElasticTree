import { redirect } from "next/navigation";

type Props = { searchParams: Promise<{ returnUrl?: string }> };

export default async function AccountsRegisterPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.returnUrl ? `?returnUrl=${encodeURIComponent(sp.returnUrl)}` : "";
  redirect(`/accounts/signin${q}`);
}
