import { useEffect, useRef, useState } from 'react';

export const useWebSocket = (url: string) => {
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

    return [socket.current, isConnected];
};