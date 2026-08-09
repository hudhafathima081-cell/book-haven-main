import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (!data?.user) {
          setIsAdmin(false);
          setCheckingAdmin(false);
          return;
        }

        const adminEmail = "hudhafathima081@gmail.com";

        setIsAdmin(data.user.email === adminEmail);
      } catch (err) {
        console.error("Error checking admin:", err);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return { isAdmin, checkingAdmin };
};