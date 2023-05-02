import { useEffect, useState } from "react";
import { UserData } from "../types/types";
import { getUserData } from "@/src/utils/utils";
import { useRouter } from "next/router";

export function useUser(redirectTo: String) {
    const [user, setUser] = useState<UserData>();
    const router = useRouter();
    useEffect(() => {
        const data = getUserData();
        setUser(data);
        if(!data){
            router.push(`${redirectTo}`);
        }
    }, []);
    return user;
  }