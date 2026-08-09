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

        // Only this email will have Admin access
        const adminEmail = "hudhafathima081@gmail.com";

        setIsAdmin(data.user.email === adminEmail);
      } catch (err) {
        console.error("Error checking admin:", err);
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return isAdmin;
};