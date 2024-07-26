// context/SortContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

type SortContextType = {
  sortBy: "date" | "priority";
  setSortBy: (criteria: "date" | "priority") => void;
};

const SortContext = createContext<SortContextType | undefined>(undefined);

export const SortProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sortBy, setSortBy] = useState<"date" | "priority">("priority");

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortContext.Provider>
  );
};

export const useSort = (): SortContextType => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
};
