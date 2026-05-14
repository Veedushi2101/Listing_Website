# WanderLust – Listing & Rental Website

An Airbnb-style full-stack web application where users can explore, create, edit, and manage property listings.

Built using Node.js, Express.js, MongoDB, EJS, and Cloudinary.

---

# Project Preview

This project allows users to:

* Add property listings
* Upload images
* Login & Register securely
* Edit and delete listings
* Explore listings from different users

---

# Tech Stack

## Frontend

* EJS
* HTML5
* CSS3
* Bootstrap

## Backend

* Node.js
* Express.js

## Database

* MongoDB Atlas
* Mongoose

## Authentication

* Passport.js
* Express Session

## Cloud Storage

* Cloudinary
* Multer

---

# Folder Structure

```bash
Listing_Website-main/
│
├── controllers/      # Route controllers
├── models/           # Database models
├── routes/           # Express routes
├── views/            # EJS templates
├── public/           # Static files (CSS, JS, Images)
├── utils/            # Utility functions
├── app.js            # Main server file
├── package.json      # Project dependencies
├── .env              # Environment variables
└── README.md         # Project documentation
```

---

# Installation Guide

Follow these steps carefully.

---

## Step 1: Download or Clone the Project

### Clone using Git

```bash
git clone https://github.com/Veedushi2101/Listing_Website
```

### Move into the project folder

```bash
cd Listing_Website-main
```

---

# Step 2: Install Node.js

Download Node.js from:

[https://nodejs.org](https://nodejs.org)

After installation, verify:

```bash
node -v
npm -v
```

If version numbers appear, Node.js is installed correctly.

---

# Step 3: Install Project Dependencies

Run:

```bash
npm install
```

This installs all required packages automatically.

---

# Step 4: Create MongoDB Database

## Create MongoDB Atlas Account

Visit:

[https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

Create a free account.

---

## Create a Cluster

Choose:

* Free Tier
* AWS
* Nearest Region

Wait for cluster creation.

---

## Create Database User

Go to:

```text
Security → Database Access
```

Create:

* Username
* Password

Example:

```text
Username: admin
Password: admin123
```

---

## Allow Network Access

Go to:

```text
Network Access
```

Add:

```text
0.0.0.0/0
```

This allows all IPs.

---

## Get Connection String

Go to:

```text
Cluster → Connect → Drivers → Node.js
```

Copy connection string.

Example:

```env
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Replace:

```text
<password>
```

with your actual password.

---

# Step 5: Create `.env` File

Create a file named:

```text
.env
```

Add the following:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
```

---

# Cloudinary Setup

## Create Account

Visit:

[https://cloudinary.com](https://cloudinary.com)

Create a free account.

Copy:

* Cloud Name
* API Key
* API Secret

Paste them into `.env`.

---

# Run the Project

## Development Mode (Recommended)

```bash
npx nodemon app.js
```

---

## Normal Mode

```bash
node app.js
```

---

# Open in Browser

After running the server, open:

```text
http://localhost:8080
```

---

# Successful Output

If everything works correctly, terminal shows:

```text
connected to DB
Server is running on port 8080
```

---

# Common Errors & Fixes

---

## Error: ENOTFOUND _mongodb._tcp

### Reason

MongoDB URL is incorrect or cluster is deleted.

### Fix

Update:

```env
ATLASDB_URL
```

inside `.env` file.

---

## Error: npm not recognized

### Fix

Install Node.js properly and restart VS Code.

---

## Error: Port already in use

### Windows

```bash
set PORT=5000 && node app.js
```

### Mac/Linux

```bash
PORT=5000 node app.js
```

---

# Major Dependencies

```json
{
  "express": "Backend framework",
  "mongoose": "MongoDB ODM",
  "ejs": "Template engine",
  "passport": "Authentication",
  "cloudinary": "Image storage",
  "multer": "File upload",
  "dotenv": "Environment variables"
}
```

---

# Future Improvements

* Add ratings and reviews
* Add payment gateway
* Add search filters
* Improve mobile responsiveness
* Add admin dashboard
* Add wishlist feature

---

# Author

Developed by **Veedushi Jain**.

---

# License

This project is created for learning and educational purposes.
