# AmiChat

AmiChat is a modern, real-time chat application built with **React.js**, **Node.js**, and **MongoDB**, using **Vite** for fast development and **Socket.IO** for seamless WebSocket communication. It features an intuitive user interface styled with **DaisyUI**, and includes cloud-based media storage via **Cloudinary**.

---

## Features

- **Real-time messaging** with Socket.IO
- **Secure authentication** using JWT and bcrypt
- **Cloud media storage** for profile pictures and shared media (Cloudinary)
- **Responsive UI** with DaisyUI
- **User-friendly toast notifications** with react-hot-toast
- **State management** using Zustand
- **Routing** handled with React Router DOM

---

## Tech Stack

### Frontend
- **Vite**: Lightning-fast build tool
- **React.js**: UI library for building interactive user interfaces
- **DaisyUI**: Tailwind CSS-based components
- **Socket.IO Client**: Real-time communication with the server
- **React Router DOM**: Declarative routing for React apps
- **React Hot Toast**: Elegant toast notifications
- **Zustand**: Minimalist state management

### Backend
- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Socket.IO**: Real-time bidirectional communication
- **Mongoose**: Elegant MongoDB object modeling
- **JWT**: Secure authentication tokens
- **Cloudinary**: Media storage and management

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- MongoDB (Atlas or local instance)
- Cloudinary account

### Environment Variables
Create a `.env` file in the root directory of your backend project with the following keys:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.example.mongodb.net/AmiChat?retryWrites=true&w=majority&appName=ChatApp
PORT=5001
JWT_SECRET=xxxxxxxx
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=xxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxx
```
Replace `xxxxxxxx` with your actual credentials, ensuring they are kept secure.

### Frontend Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

---

## Dependencies

### Frontend
```json
{
  "axios": "^1.7.9",
  "lucide-react": "^0.469.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hot-toast": "^2.4.1",
  "react-router-dom": "^7.1.1",
  "socket.io-client": "^4.8.1",
  "zustand": "^5.0.2"
}
```

### Backend
```json
{
  "bcryptjs": "^2.4.3",
  "cloudinary": "^2.5.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.9.1",
  "nodemon": "^3.1.9",
  "socket.io": "^4.8.1"
}
```

---

## Usage
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/amichat.git
   ```
2. Set up the environment variables.
3. Run the backend and frontend servers.
4. Open your browser and navigate to the frontend server (default: `http://localhost:5173`).

---

## Screenshots
![AmiChat Interface](frontend/public/AmiChat.png)

---

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests for improvements.

---

## Acknowledgements
- **Vite** for its fast build times
- **DaisyUI** for beautiful UI components
- **Socket.IO** for real-time communication

