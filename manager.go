package main

import (
	"fmt"
	"log"
	"net/http"

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

}

func NewManager() *Manager {
	return &Manager{}
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

    fmt.Print(conn)
}
