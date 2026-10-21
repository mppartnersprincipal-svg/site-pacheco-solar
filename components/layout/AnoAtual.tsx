"use client";

import { useEffect, useState } from "react";

/**
 * Ano corrente só no cliente: com Cache Components, `new Date()` durante a
 * pré-renderização derruba o build. No HTML estático sai vazio; após hidratar, o ano.
 */
export function AnoAtual() {
  const [ano, setAno] = useState<number | null>(null);
  useEffect(() => setAno(new Date().getFullYear()), []);
  return <>{ano ?? ""}</>;
}
