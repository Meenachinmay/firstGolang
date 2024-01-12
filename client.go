package main

import (
	"log"

	"github.com/gorilla/websocket"
)

type ClientList map[*Client] bool

type Client struct {
	//
	connection *websocket.Conn
	manager *Manager

	// egress is used to avoid concurrent writes on the websockets connection
	egress chan []byte
}

func NewClient(conn *websocket.Conn, manager *Manager) *Client {
	return &Client {
		connection: conn,
		manager: manager,
		egress: make(chan []byte),
	}
}

// read message in real time from client
func (c *Client) readMessages() {
	defer func() {
		// cleanup connection here
		c.manager.removeClient(c)
	}()
	for {
		messageType, payload, err := c.connection.ReadMessage()

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error reading message: %v", err)
			}
			break
		}

		for wsclient := range c.manager.clients {
			wsclient.egress <- payload
		}

		log.Println(messageType)
		log.Println(string(payload))
	}
}

// send messages to client in real time
func (c *Client) writeMessages() {
	defer func ()  {
		c.manager.removeClient(c)	
	}()

	for {
		select {
		case message, ok := <-c.egress:
			if !ok {
				if err := c.connection.WriteMessage(websocket.CloseMessage, nil); err !=nil {
					log.Println("connection closed:", err)
				}
				return
			}

			// send a message to the client in real time
			if err := c.connection.WriteMessage(websocket.TextMessage, message); err != nil {
				log.Printf("failed to send message: %v", err)
			}

			log.Println("message sent")
		}
	}
}