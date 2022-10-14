import React, { createContext, SetStateAction, useState } from "react";
import { User } from "../Types/User";

type ContextType = {
    userIfinance: User;
    setUserIfinance: React.Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<ContextType>({
    userIfinance: null,
    setUserIfinance: () => null
});