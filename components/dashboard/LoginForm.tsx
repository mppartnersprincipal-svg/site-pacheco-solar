"use client";

import { useActionState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { login, type LoginState } from "@/app/(painel)/dashboard/actions";

const INITIAL: LoginState = { error: null };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, INITIAL);

  return (
    <form action={action} className="rounded-2xl border border-line bg-surface p-6 shadow-[0_8px_24px_rgba(21,48,59,0.06)]">
      <label htmlFor="senha" className="block text-sm font-semibold text-ink">
        Senha
      </label>
      <div className="relative mt-2">
        <LockKeyhole aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-muted" />
        <input
          id="senha"
          name="senha"
          type="password"
          required
          autoComplete="current-password"
          autoFocus
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "senha-erro" : undefined}
          className="min-h-11 w-full rounded-full border border-line bg-surface pr-4 pl-10 text-sm text-ink-body outline-none focus:border-brand-action focus:ring-2 focus:ring-brand-action/30"
        />
      </div>
      {state.error ? (
        <p id="senha-erro" role="alert" className="mt-2 text-sm font-semibold text-brand-hover">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-action text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : null}
        Entrar
      </button>
    </form>
  );
}
