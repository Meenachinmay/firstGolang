"use client";

import { useWebSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

export default function Chat () {
    const [socket, isConnected] = useWebSocket("ws://localhost:8080/ws");
    useEffect(() => {
        if (isConnected) {
            console.log('Connected to the server');

            // socket.on('connection', (data: any) => {
            //     console.log("Received data:", data);
            // })

        }
    }, [isConnected, socket])
    return (
        <>
            <div>Hello world, Chat App!</div>
        </>
    )
}