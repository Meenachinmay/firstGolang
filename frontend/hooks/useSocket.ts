import { useCallback, useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string, onMessageReceived: any) => {
    const socket = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

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
            if (onMessageReceived) {
                onMessageReceived(evt.data);
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
    const sendMessage = useCallback((message: string) => {
        if (socket.current && isConnected) {
            socket.current.send(message);
        }
    }, [isConnected]);

    return {socket: socket.current, isConnected, sendMessage};
};