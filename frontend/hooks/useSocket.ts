import { NewMessage } from '@/app/chat/page';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useWebSocket = <T,>(url: string) => {
    const socket = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [latestMessage, setLatestMessage] = useState<T | null>(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socket.current = new WebSocket(url);

        // Event listeners
        socket.current.onopen = () => {
            setIsConnected(true);
            console.log('WebSocket connected');
        };

        socket.current.onclose = () => {
            setIsConnected(false);
            console.log('WebSocket disconnected');
        };

        socket.current.onmessage = (evt) => {
           try {
            const data: T = JSON.parse(evt.data);
            setLatestMessage(data);  

           } catch (error) {
            console.error("Failed to parse message: ", error);          
           }
        }

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Cleanup on unmount
        return () => {
            if (socket.current) {
                socket.current.close();
            }
        };
    }, [url]);

    // function to send messages to the server
    const sendMessage = useCallback((data: NewMessage) => {
        if (socket.current && isConnected) {
            socket.current.send(JSON.stringify(data));
        }
    }, [isConnected]);

    return {socket: socket.current, isConnected, sendMessage, latestMessage};
};