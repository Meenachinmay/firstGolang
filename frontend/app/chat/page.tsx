"use client";

import { useWebSocket } from "@/hooks/useSocket";
import { IMessage } from "@/types/message";
import { useCallback, useEffect } from "react";

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

export default function Chat() {
  const { handleSubmit, register } = useForm();

  const handleMessageReceived = useCallback((data: any) => {
    console.log(data);
  }, []); // Add dependencies if any

  // consuming websockets
  const { socket, isConnected, sendMessage } = useWebSocket(
    "ws://localhost:8080/ws",
    handleMessageReceived
  );

  // react-hook-form onSubmit method
  const onSubmit = (data: any) => {
    sendMessage(data.message);
  };

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
            {messages.map((message) => (
              <div
                key={message.sender}
                className={`flex flex-row items-center space-x-2 ${
                  message.sender === "me" ? "bg-[#575757]" : "bg-[#9ed2d9]"
                } p-3 rounded-md`}
              >
                <p
                  className={`${
                    message.sender === "me" ? "text-slate-200" : "text-gray-700"
                  } text-sm w-auto font-normal`}
                >
                  {message.message}
                </p>
              </div>
            ))}
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
