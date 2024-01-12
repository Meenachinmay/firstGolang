"use client";

import { useWebSocket } from "@/hooks/useSocket";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { molle, vt323 } from "../fonts";

export interface NewMessage {
  id: string;
  message: string;
  timeStamp: Date;
}

export default function Chat() {
  // consuming websockets
  const { socket, isConnected, sendMessage, latestMessage } =
    useWebSocket<NewMessage>("ws://localhost:8080/ws");

  const { handleSubmit, register, reset } = useForm();
  const [messages, setMessage] = useState<NewMessage[] | null>(null);

  // react-hook-form onSubmit method
  const onSubmit = (data: any) => {
    const finalData: NewMessage = {
      id: uuidv4(),
      message: data.message,
      timeStamp: new Date(),
    };

    sendMessage(finalData);
    reset({ message: "" });
  };

  useEffect(() => {
    if (latestMessage) {
      console.log(latestMessage);

      // updating the state of array with messages
      setMessage((prevMessages) => {
        const updatdMessages = prevMessages ? [...prevMessages] : [];
        updatdMessages.push(latestMessage);
        return updatdMessages;
      });
    }
  }, [latestMessage]);

  useEffect(() => {
    if (isConnected) {
      console.log("Connected to the server");
    }
  }, [isConnected, socket]);

  return (
    <>
      <main
        className={` ${vt323.className} flex flex-row bg-[#f7f7f7] w-full h-screen p-[24px]`}
      >
        {/* LEFT */}
        <div className="w-1/3 border border-black border-dashed">
          <div className="flex w-full items-center justify-center bg-black p-2">
            <p className="text-white text-2xl">Participants</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col w-full bg-transparent h-full border border-black border-dashed">
          <div
            className="flex flex-col bg-pattern w-full h-full space-y-2 p-3"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(0,0,0,.05) 2px, transparent 2px), linear-gradient(rgba(0,0,0,.05) 2px, transparent 2px)",
              backgroundSize: "5px 5px",
            }}
          >
            {messages?.map((message) => (
              <div
                key={message.id}
                className={`flex flex-row items-center space-x-2 bg-[#575757] p-3 opacity-80`}
              >
                <p className={`text-gray-200 text-lg w-auto font-normal`}>
                  {message?.message}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row w-full h-[60px] rounded-md space-x-1">
              <input
                {...register("message", {
                  required: "It is required to enter a message",
                })}
                type="text"
                placeholder="Enter your message..."
                className="text-xl border border-black border-dashed font-light w-full p-3 focus:outline-none text-gray-700 bg-white"
              />
              <button
                type="submit"
                className="bg-[#f7f7f7] border border-black border-dashed w-[200px] text-xl animate-pulse cursor-pointer"
              >
                +Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
