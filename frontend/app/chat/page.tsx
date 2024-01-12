"use client";

import { useWebSocket } from "@/hooks/useSocket";
import { IMessage } from "@/types/message";
import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";

const messages: IMessage[] = [
  {
    sender: "me",
    message:
      "Hello world, i am chinmay anand and i am writing a chat app in golang and nextjs. this is my first golang project.",
    read: false,
  },
  {
    sender: "other",
    message: "world hello",
    read: false,
  },
];

export interface NewMessage {
  message: string;
  timeStamp: Date;
}

export default function Chat() {
  // consuming websockets
  const { socket, isConnected, sendMessage, latestMessage } =
    useWebSocket<NewMessage>("ws://localhost:8080/ws");

  const { handleSubmit, register } = useForm();
  const [message, setMessage] = useState<NewMessage | null>(null);

  // react-hook-form onSubmit method
  const onSubmit = (data: any) => {
    const finalData: NewMessage = {
      message: data.message,
      timeStamp: new Date(),
    };

    sendMessage(finalData);
    data.message = '';

  };

  useEffect(() => {

    if (latestMessage) {
      console.log(latestMessage);
      setMessage(latestMessage);
    }

  }, [latestMessage]);

  useEffect(() => {
    if (isConnected) {
      console.log("Connected to the server");
    }
  }, [isConnected, socket]);

  return (
    <>
      <main className="flex flex-row bg-gray-700 w-full h-screen p-[24px]">
        {/* LEFT */}
        <div className="w-1/3 bg-green-100 rounded-l-md border-r border-gray-200 p-3">
          <div className="flex w-full border-b border-gray-300 items-center justify-center">
            <p className="text-gray-700">Participants</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col w-full bg-cyan-100 rounded-r-md p-3 space-y-3 h-full">
          <div className="flex flex-col bg-[#242424] w-full h-full rounded-md p-3 space-y-2">
            <div
              className={`flex flex-row items-center space-x-2 bg-[#575757] p-3 rounded-md`}
            >
              <p className={`text-gray-200 text-sm w-auto font-normal`}>
                {message?.message}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row w-full h-[70px] rounded-md space-x-1">
              <input
                {...register("message", {
                  required: "It is required to enter a message",
                })}
                type="text"
                placeholder="Enter your message..."
                className="text-sm font-light w-full p-3 focus:outline-none text-gray-700 bg-white"
              />
              <button
                type="submit"
                className="bg-[#242424] w-[100px] rounded-md"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
