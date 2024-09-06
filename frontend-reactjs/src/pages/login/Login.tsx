import { EyeFilledIcon } from "@/assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/assets/EyeSlashFilledIcon";
import { APIURL, http } from "@/assets/http";
import { MailIcon } from "@/assets/MailIcon";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

interface Message {
  color: string;
  message: string;
}

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("asdasd");
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setLoading(true);

    try {
      const response = await http.post(`${APIURL}/accounts/login`, data);

      const jwt = response.data.accessToken;
      const userId = response.data.id;
      localStorage.setItem("jwtToken", jwt);
      localStorage.setItem("userId", userId);

      setMessage({ message: "Login successful!", color: "green" });

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error: any) {
      console.log(error);
      setMessage({
        message: `Login failed. ${error.response.data.message}`,
        color: "red",
      });
    }
    setLoading(false);
  };
  return (
    <div className="h-screen bg-gradient-to-r from-blue-200 to-pink-200 grid place-items-center">
      <Card className="max-w-xl w-full ">
        <CardHeader className="justify-center ">
          <div className="font-semibold text-2xl my-1 grid place-items-center">
            Log In 👋
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="grid gap-3">
            <Input
              name="email"
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="text"
              label="Email"
              placeholder="Enter your email"
            />
            <Input
              name="password"
              label="Password"
              placeholder="Enter your password"
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              color="success"
            >
              Log In!
            </Button>
          </form>
        </CardBody>
        {message && (
          <CardFooter className="w-full">
            <div className="flex w-full justify-center">
              <div
                className="p-4 rounded-3xl my-3 text-white text-sm font-poppins"
                style={{ backgroundColor: message?.color || "transparent" }}
                id="alttaki-response-yeri"
              >
                {message?.message}
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
