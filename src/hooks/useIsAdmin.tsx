import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const adminEmail = "hudhafathima081@gmail.com";

      setIsAdmin(
        user?.email?.toLowerCase().trim() === adminEmail.toLowerCase()
      );
    };

    checkAdmin();

    // Re-check whenever login/logout happens
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkAdmin();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return isAdmin;
};