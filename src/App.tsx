import { useEffect } from "react";
import { supabase } from "./lib/supabase";

import HomePage from "./features/dashboard/HomePage";

function App() {
  useEffect(() => {
    async function testConnection() {
      const { data, error } = await supabase
        .from("test")
        .select("*");

      console.log("Data:", data);
      console.log("Error:", error);
    }

    testConnection();
  }, []);

  return <HomePage />;

}

export default App;