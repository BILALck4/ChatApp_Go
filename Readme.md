# **Projet de Chat en Temps Réel avec WebSockets et JWT**

## 🗓 **Description du Projet**

Ce projet est une application de chat en temps réel développée avec une architecture moderne, intégrant une communication bidirectionnelle via **WebSockets** et une gestion sécurisée des utilisateurs grâce à des **tokens JWT (JSON Web Tokens)**. L'application permet à plusieurs utilisateurs de communiquer de manière fluide et sécurisée.

L'objectif de ce projet est de démontrer la maîtrise des technologies backend et frontend pour une application réactive et performante, avec une architecture facilement extensible.

---

## 🚀 **Fonctionnalités**

- **Connexion sécurisée** avec authentification via JWT.
- **Communication en temps réel** grâce à une intégration de WebSockets.
- Interface utilisateur responsive et conviviale avec **Material UI (MUI)**.
- Gestion dynamique des messages affichés et défilement automatique vers le dernier message.
- Affichage en temps réel des messages de différents utilisateurs.

---

## 🛠️ **Technologies Utilisées**

### **Frontend**
- **React** pour la gestion de l'interface utilisateur.
- **Material UI (MUI)** pour le design et le style des composants.
- **TypeScript (optionnel selon la version)** pour une meilleure gestion des types.

### **Backend**
- **Node.js** et **Express** pour la gestion des requêtes HTTP et WebSocket.
- **WebSockets (WS)** pour une communication temps réel bidirectionnelle.
- **JWT (JSON Web Token)** pour une authentification sécurisée des utilisateurs.

---

## 🛠️ **Installation et Lancement**

### **Prérequis**
- Node.js installé (version >= 14)
- Git installé
- Un éditeur de code comme Visual Studio Code

### **Étapes d'installation**

1. **Clonez le projet depuis GitHub :**
   ```bash
   git clone https://github.com/votre-compte/chat-app.git
   cd chat-app
   ```

2. **Installation des dépendances frontend :**
   ```bash
   cd chat-frontend
   npm install
   ```

3. **Installation des dépendances backend :**
   ```bash
   cd ..
   cd chat-backend
   npm install
   ```

4. **Lancer le serveur backend :**
   ```bash
   node server.js
   ```

5. **Lancer le serveur frontend :**
   ```bash
   npm start
   ```

6. **Accédez à l'application :**
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ⚙️ **Architecture**

### **Schéma Simplifié :**
```
Frontend (React) <-> WebSocket + HTTP (JWT Auth) <-> Backend (Node.js)
```

### **Points Techniques Clés**
- Séparation nette des responsabilités entre backend (serveur WebSocket + API HTTP) et frontend (gestion des composants UI).
- Utilisation d'un système sécurisé JWT pour maintenir les sessions utilisateur.
- Gestion efficace des événements WebSocket pour assurer une synchronisation en temps réel des messages.

---

## 🫠 **Améliorations Futures**

- Intégration d'une base de données pour la persistance des messages.
- Création de salons de discussion multiples.
- Ajout d'une gestion des utilisateurs avec profils.
- Implémentation de tests unitaires et d'intégration.
- Déploiement sur une plateforme cloud.

---

## 🎨 **Aperçu Visuel**
![Capture d'écran de l'application](./screenshot.png)

---

## 💡 **Pourquoi ce Projet ?**

Ce projet a été développé pour mettre en avant mes compétences en développement fullstack, avec un focus particulier sur :
- **Communication temps réel** et **gestion sécurisée des utilisateurs**.
- **Bonne gestion des états** dans une application réactive (frontend).
- Conception propre et maintenable du code.

---

## 🧑‍💻 **Auteur**

- **Chekhchou Bilal** - Développeur Fullstack.
- N'hésitez pas à me contacter pour toute question ou collaboration.

---

## 📨 **Contact**

- 📧 **Email:** bilal.chekhchou@gmail.com (remplacez par votre adresse)
- 💼 **LinkedIn:** [CHEKHCHOU Bilal](https://www.linkedin.com/in/bilal-chekhchou-83968b249/)
- 🌐 **GitHub:** [Mon Github](https://github.com/Bilalck4)


