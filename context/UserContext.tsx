// contexts/UserContext.tsx
import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  userId: string | null;
  setUserId: (id: string) => void;
  onboarded: boolean;
  setOnboarded: (bool: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [onboarded, setOnboarded] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{ userId, setUserId, onboarded, setOnboarded }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
