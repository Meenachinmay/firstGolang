package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
  "github.com/gorilla/handlers"
)

func main() {
  router := mux.NewRouter()
  manager := NewManager()
  router.HandleFunc("/ws", manager.serveWS).Methods(http.MethodGet, http.MethodOptions)

  corsOptions := handlers.AllowedOrigins([]string{"http://localhost:3000"})
  corsHandler := handlers.CORS(corsOptions)

  server := http.Server{
      Addr:    ":8080",
      Handler: corsHandler(router),
  }

  fmt.Println("server listening on port 8080")
  log.Fatal(server.ListenAndServe())
}