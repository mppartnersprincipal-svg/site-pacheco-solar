"use client";

import { useSyncExternalStore } from "react";

const semInscricao = () => () => {};
const anoNoCliente = () => new Date().getFullYear();
const anoNoServidor = () => null;

/**
 * Ano corrente só no cliente: com Cache Components, `new Date()` durante a
 * pré-renderização derruba o build. No HTML estático sai vazio; após hidratar, o ano.
 */
export function AnoAtual() {
  const ano = useSyncExternalStore(semInscricao, anoNoCliente, anoNoServidor);
  return <>{ano ?? ""}</>;
}
