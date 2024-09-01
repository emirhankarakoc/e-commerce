import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import axios from "axios";
import Navigation from "@/components/Navigation";

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (count === 10) {
      setCount(0);
    }
  }, [count]);

  useEffect(() => {
    const method = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/hello/test-endpoint"
        );
        console.log(response.data);
        setMessage(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    method();
  }, []);

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div>
        <div className="grid gap-3 px-56">
          <div className="m-2 gap-1 grid grid-cols-12">
            <div className="col-span-8 bg-gray-300 rounded-full grid place-items-center  ">
              sol buyuk
            </div>
            <div className="col-span-4 bg-blue-600 rounded-full grid place-items-center  ">
              sag ufak
            </div>
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12 grid  flex">
              <Button
                onPress={() => {
                  setIsLoading(false);
                  setCount(count + 1);
                }}
                color="danger"
              >
                end loading
              </Button>
            </div>
            <div className="col-span-4"></div>
          </div>
          <Button
            isLoading={isLoading}
            onPress={() => {
              setIsLoading(true);
              setCount(count + 1);
            }}
            color="secondary"
          >
            start
          </Button>

          <div className="grid grid-cols-12">
            <div className="col-span-12 grid place-items-center">{count}</div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-12 grid place-items-center ">
              {" "}
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
