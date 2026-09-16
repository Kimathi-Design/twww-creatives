"use client";

import { createContext, useContext } from "react";

type DeckNavContextValue = {
  goTo: (index: number) => void;
  current: number;
};

const DeckNavContext = createContext<DeckNavContextValue | null>(null);

export function DeckNavProvider({
  value,
  children,
}: {
  value: DeckNavContextValue;
  children: React.ReactNode;
}) {
  return (
    <DeckNavContext.Provider value={value}>{children}</DeckNavContext.Provider>
  );
}

export function useDeckNav() {
  return useContext(DeckNavContext);
}
