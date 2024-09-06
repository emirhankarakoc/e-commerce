import { APIURL, http } from "@/assets/http";
import Navigation from "@/components/Navigation";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const handleGetMe = async () => {
      try {
        const response = await http.get(`${APIURL}/accounts/getme`);
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
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
              {user.role === "ROLE_ADMIN" && (
                <Button
                  onClick={() => {
                    window.location.href = "/admin";
                  }}
                  color="danger"
                >
                  ADMIN MENU
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid place-items-center h-screen ">
            <p className="font-semibold font-sfpro">Login first</p>
          </div>
        )}
      </div>
    </div>
  );
}
