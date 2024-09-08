import { APIURL, http } from "@/assets/http";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState<User>();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const handleGetMe = async () => {
      try {
        const response = await http.get(`${APIURL}/accounts/getme`);
        setUser(response.data);
        setFullName(response.data.fullName || "");
        setEmail(response.data.email || "");
      } catch (error) {
        console.log(error);
      }
    };

    handleGetMe();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("picture", selectedFile);

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await http.put(`${APIURL}/users/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUser(response.data); // Update user state with the new profile picture
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    const updatedUser = {
      fullName,
      email,
    };

    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await http.put(`${APIURL}/users`, updatedUser, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 border-green-500">
      <h1 className="p-5 text-3xl font-bold font-sfpro">Profile</h1>

      <div className="p-32">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col items-center">
            <h1 className="text-3xl font-bold font-sfpro mb-4">Photo</h1>
            <img
              className="w-64 h-64 rounded-full mb-4"
              src={
                user?.profilePhotoPath ||
                "https://cdn-icons-png.freepik.com/512/9307/9307950.png"
              } // Use a default image if user has no profile photo
              alt="Profile photo"
            />
            <p className="mb-4">Do you want to update your photo?</p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              aria-label="Upload Profile Photo"
              className="mb-4"
            />
            <Button onClick={handleFileUpload} color="primary">
              Upload Photo
            </Button>
          </div>

          <div className="col-span-2 grid place-items-center">
            <div className="mb-4">
              <p className="font-bold font-sfpro text-3xl">Fullname</p>
              <Input
                className="w-80"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-4">
              <p className="font-bold font-sfpro text-3xl">E-Mail Adress</p>

              <Input
                className="w-80"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <Button onClick={handleSave} color="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
