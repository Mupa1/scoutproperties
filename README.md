<div align="center">
  <h1 align="center">Scout Properties</h1>

![Screenshot](client/public/Screenshot.png)

  <div>
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=5399b7"alt="react" />
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=93C746" alt="node.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=303030" alt="express.js" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />

  </div>
</div>

<h3 align="center">A real estate application</h3>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. 🛠️ [Tech Stack](#tech-stack)
3. 🚀 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 👏 [Credits](#credits)

## <a name="introduction">🤖 Introduction</a>

Scoutproperties is a real estate application where property agents or owners can register and post properties for rent or sale. Users can search for houses, apartments, condos or land and contact the agent or owner to buy or rent the property.

## <a name="tech-stack">🛠️ Tech Stack</a>

- React
- TypeScript
- TailwindCSS
- Cloudinary
- Node.js
- Express
- MongoDB
- OpenAPI

## <a name="features">🚀 Features</a>

👉 **Register**: Users can sign up and create a personal profile.

👉 **Login**: Users can login into their account.

👉 **Update Profile**: Users can update their profile.

👉 **View Properties**: Users can view all properties without being logged in.

👉 **Search and filter Properties**: Users can search and filter for properties without being logged in.

👉 **Create property listings**: Logged in users(property owners or agents) can create property listings.

👉 **Image Upload Widget using Cloudinary**: Users can upload profile avatars or images for a property listing within the app using Cloudinary Image Upload Widget.

👉 **Send Email**: Users can send an email to the property owner or agent to buy or rent property.

👉 **Fully Responsive UI**: The application works seamlessly on all device types and screen sizes.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/getting-started)

**Cloning the Repository**

```bash
git clone https://github.com/Mupa1/scoutproperties.git
cd scoutproperties
```

**Installation**

Install the project dependencies using yarn:

**Client**

```bash
cd client
yarn install
```

**Server**

```bash
cd server
yarn install
```

**Set Up Environment Variables**

**_Client_**

```bash
cd client
```

Create a new file named .env.local in the root of your client directory and add the following content:

```env
VITE_API_BASE_URL='http://localhost:3000'
```

**_Server_**

```bash
cd server
```

Create a new file named `.env` in the root of your server directory and add the following content including your [MongoDB](https://account.mongodb.com/account) database URL and any JWT secret key:

```env
DATABASE_URL=
JWT_SECRET_KEY=
```

**Running the Project**

Ensure both client and server are running.

**_Client_**

```bash
cd client
yarn dev
```

**_Server_**

```bash
cd server
yarn dev
```

Open [http://localhost:4173](http://localhost:4173) in your browser to view the project.

**Testing the API Endpoint**

- Through OpenAPI Documentation:

  Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser to view the API documentation and test the API endpoints.

- Through Postman:

  Open [http://localhost:3000](http://localhost:3000) in Postman to test the various API endpoints.

## <a name="credits">👏 Credits</a>

The listings images are from <a href="https://unsplash.com">Unsplash.</a>
