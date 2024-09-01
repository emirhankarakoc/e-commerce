import { APIURL, http } from "@/assets/http";
import Navigation from "@/components/Navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  // Define a type for user state
  type User = {
    id: string;
    email: string;
    role: string;
  } | null;

  // Initialize state as User or null
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const handleGetMe = async () => {
      try {
        const response = await http.get(`${APIURL}/accounts/getme`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setUser(null); // Correctly set state to null on error
      }
    };

    handleGetMe();
  }, []);

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        {user ? (
          <div className="grid place-items-center h-screen ">
            <div className="">
              <div className="font-semibold">User Information</div>
              <p></p>
              UserId: {user.id} --saved to localstorage
              <p></p>
              Email: {user.email}
              <p></p>
              Role: {user.role}
              <p></p>
              <div className="font-semibold">
                Also saved JWT token to header in http.tsx
              </div>
            </div>
          </div>
        ) : (
          <div className="grid place-items-center h-screen ">
            <p className="font-semibold">Login first</p>
          </div>
        )}
      </div>
    </div>
  );
}
