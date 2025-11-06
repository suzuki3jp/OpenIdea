import type { PostgrestError } from "@supabase/supabase-js";

export function consoleError(error: PostgrestError): void {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.error(error);
}
