![Screenshot (101)](https://github.com/user-attachments/assets/51c2f246-bb3c-48be-b9ee-87abf35a7d5e)# LAS File Viewer Application

This project is a full-stack LAS File Viewer that allows users to upload LAS files and view them in a web browser. The application consists of a backend server built with Node.js and Express, and a frontend built with React and Next.js. The frontend is hosted on Vercel, and the backend is hosted on Render.

## Live Demo

- **Frontend**: [https://aero2astro-client-side.vercel.app/](https://aero2astro-client-side.vercel.app/)
- **Backend**: [https://aero2astro-serverside1.onrender.com/](https://aero2astro-serverside1.onrender.com/)
- **Video & SS**:[https://www.dropbox.com/scl/fi/4697q7xmzfzmc3alu29kt/Video-SS.zip?rlkey=14pxo6wgcewazybvkl8h8gcey&st=2r7coyh4&dl=0]

## Tech Stack

### Frontend
- **React**
- **Next.js**
- **Tailwind CSS** for styling
- **Axios** for API calls

### Backend
- **Node.js**
- **Express**
- **MongoDB** with **GridFS** for file storage
- **Multer** for file uploads
- **CORS** for cross-origin requests

## Features

- Users can upload LAS files.
- Files are stored in MongoDB using GridFS.
- Files can be retrieved and viewed using Plasio in the frontend.
- The frontend provides error handling, loading states, and user-friendly feedback.

## Setup and Installation

Usage
Visit the frontend application at https://aero2astro-client-side.vercel.app/.
Upload a LAS file using the upload form.
Once the file is uploaded, click the "View Uploaded File" button to view the LAS file in a new tab.

API Endpoints
Upload a LAS File
URL: /api/upload
Method: POST
Request Body: Form-data with a file field.
Response: { "fileId": "<file-id>" }

Retrieve a LAS File
URL: /api/las/:fileId
Method: GET
Description: Retrieves and streams a LAS file from MongoDB GridFS.
