import { http } from "@/assets/http";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
export default function UpdateUser({
  user,
  setState,
}: {
  user: User;
  setState: (active: boolean) => void;
}) {
  // Kullanıcı bilgilerini state'e alıyoruz
  const [email, setEmail] = useState(user.email || "");
  const [role, setRole] = useState(user.role || "");
  const [fullName, setFullName] = useState(user.fullName || "");
  const [balance, setBalance] = useState(user.balance || "");
  const [profilePhotoPath, setProfilePhotoPath] = useState(
    user.profilePhotoPath || ""
  );

  const handleUpdate = async () => {
    try {
      const response = await http.put(`/admins/users/${user.id}`, {
        email,
        role,
        fullName,
        balance: parseFloat(balance),
        profilePhotoPath,
        cart: user.cart, // Sepet bilgileri güncellenmediği için mevcut haliyle gönderiyoruz
      });
      alert("Update successfull. Please refresh the page.");
      console.log("User updated:", response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="px-20 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">User Update Menu</h1>
        <Button color="danger" onClick={() => setState(false)}>
          <i
            className="fa-solid fa-xmark fa-2xl"
            style={{ color: "white" }}
          ></i>
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          isClearable
          label="Email"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          isClearable
          label="Role"
          placeholder="Enter user role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <Input
          isClearable
          label="Full Name"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <Input
          isClearable
          label="Balance"
          placeholder="Enter balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <Input
          isClearable
          label="Profile Photo Path"
          placeholder="Enter profile photo path"
          value={profilePhotoPath}
          onChange={(e) => setProfilePhotoPath(e.target.value)}
        />

        <div className="mt-6">
          <Button color="success" onClick={handleUpdate}>
            Update User
          </Button>
        </div>
      </div>
    </div>
  );
}
