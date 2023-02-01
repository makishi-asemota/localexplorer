import { createContext, PropsWithChildren, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { UserInterface } from "./Userinterface";

export const myContext = createContext<any>({});
export default function Context(props: PropsWithChildren<any>) {
  const [user, setUser] = useState<UserInterface>();

  // get user everytime they are loggged in
  useEffect(() => {
    axios
      .get("http://localhost:8000/user", { withCredentials: true })
      .then((res: AxiosResponse) => {
        setUser(res.data);
      });
  }, []);

  // create a provider for all children components
  return <myContext.Provider value={user}>{props.children}</myContext.Provider>;
}
