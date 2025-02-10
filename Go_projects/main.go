package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/gorilla/websocket"
)

var jwtKey = []byte("secret_key") // Clé secrète pour signer les tokens JWT

type Claims struct {
	Username string `json:"username"`
	jwt.RegisteredClaims
}

type Client struct {
	Conn     *websocket.Conn
	Username string
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

var clients = make(map[*websocket.Conn]*Client)

func generateJWT(username string) (string, error) {
	expirationTime := time.Now().Add(24 * time.Hour) // Token valide pendant 24h

	claims := &Claims{
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

func authenticateUser(c *gin.Context) {
	var loginData struct {
		Username string `json:"username"`
	}

	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Requête invalide"})
		return
	}

	if loginData.Username == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Pseudo requis"})
		return
	}

	// Générer le token JWT
	token, err := generateJWT(loginData.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Erreur lors de la génération du token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Authentification réussie",
		"token":   token,
	})
}

func validateJWT(tokenString string) (string, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !token.Valid {
		return "", fmt.Errorf("Token JWT invalide")
	}

	return claims.Username, nil
}

func handleConnections(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token manquant"})
		return
	}

	// Vérification du token JWT
	username, err := validateJWT(token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println("Erreur WebSocket:", err)
		return
	}
	defer conn.Close()

	client := &Client{Conn: conn, Username: username}
	clients[conn] = client

	fmt.Println(client.Username, "s'est connecté !")

	// Informer les autres utilisateurs
	message := fmt.Sprintf("%s a rejoint le chat !", client.Username)
	for c := range clients {
		c.WriteMessage(websocket.TextMessage, []byte(message))
	}

	// Boucle pour écouter les messages
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Client déconnecté:", client.Username)
			delete(clients, conn)

			// Informer les autres que l'utilisateur est parti
			leaveMessage := fmt.Sprintf("%s a quitté le chat.", client.Username)
			for c := range clients {
				c.WriteMessage(websocket.TextMessage, []byte(leaveMessage))
			}
			break
		}

		fmt.Printf("[%s] %s\n", client.Username, string(msg))
		saveMessage(client.Username, string(msg))

		// Diffuser à tous les clients
		for c := range clients {
			c.WriteMessage(websocket.TextMessage, []byte(fmt.Sprintf("%s: %s", client.Username, msg)))
		}
	}
}

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Autoriser seulement ton frontend
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
	}))
	initDB()

	// Route pour s'authentifier et obtenir un token JWT
	r.POST("/login", authenticateUser)

	// WebSocket avec vérification JWT
	r.GET("/ws", handleConnections)

	fmt.Println("Serveur chat démarré sur le port 8080...")
	r.Run(":8080")
}
