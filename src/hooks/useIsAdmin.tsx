import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (!data?.user) {
          setIsAdmin(false);
          return;
        }

        setIsAdmin(true); // simple for now
      } catch (err) {
        console.error("Error checking admin:", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return isAdmin;
};