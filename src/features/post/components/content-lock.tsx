import { Lock } from "lucide-react";
import { createCheckoutSession } from "@/lib/stripe/create-checkout-session";
export function ContentLock() {
  return (
    <div className="h-full w-full flex-1 bg-[#5A839740]">
      <PayButton />
    </div>
  );
}

function PayButton() {
  return (
    <form action={createCheckoutSession}>
      <button
        type="submit"
        className="mx-auto my-8 flex rounded-full bg-linear-to-r from-[#FFFFFF] to-[#B1E0F3] px-9 py-4 shadow-xl"
      >
        <Lock size={20} />
        ここから先は有料です
        <br />
        購入画面へ
      </button>
    </form>
  );
}
