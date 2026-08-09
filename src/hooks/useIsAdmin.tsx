import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const adminEmail = "hudhafathima081@gmail.com";

        setIsAdmin(
          user?.email?.toLowerCase().trim() ===
            adminEmail.toLowerCase().trim()
        );
      } catch (error) {
        console.error("Admin check error:", error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return { isAdmin, checkingAdmin };
};