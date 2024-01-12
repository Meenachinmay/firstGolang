package main

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var (
	websocketUpgrader = websocket.Upgrader{
		ReadBufferSize: 1024,
		WriteBufferSize: 1014,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
)

type Manager struct {
    clients ClientList
    sync.RWMutex
}

func NewManager() *Manager {
	return &Manager{
        clients: make(ClientList),
    }
}

func (m *Manager) serveWS(w http.ResponseWriter, r *http.Request) {
    // Set CORS headers
    w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
    w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    w.Header().Set("Access-Control-Allow-Headers", "authentication, content-type")

    if r.Method == http.MethodOptions {
        w.WriteHeader(http.StatusOK)
        return
    }

    log.Println("new connection")

    conn, err := websocketUpgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }

    client := NewClient(conn, m)
    m.addClient(client)
}

// to add a new connection to managers
func (m *Manager) addClient (client *Client) {
    m.Lock()
    defer m.Unlock()

    m.clients[client] = true
}

// to remove a connection from manager
func (m *Manager) removeClient(client *Client) {
    m.Lock()
    defer m.Unlock()

    if _, ok := m.clients[client]; ok {
        client.connection.Close()
        delete(m.clients, client)
    }
}
