import { createContext, useState } from "react";
import { ICard, ICardContext } from "@/utils/interfaces";

export const CardContext = createContext<ICardContext>({} as ICardContext);

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [card, setCard] = useState<ICard>({ user_Id: "", items: [] });

  return (
    <CardContext.Provider value={{ card, setCard }}>
      {children}
    </CardContext.Provider>
  );
};
