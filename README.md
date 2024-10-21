# Image Gallery App

## 1. Introduction
The Image Gallery App allows users to upload, manage, and interact with images. This documentation outlines the technical design, functionalities, and usage instructions for the application.

## 2. Project Architecture

### 2.1 Architecture Diagrams
- **Database Diagram**: [Insert your database diagram here]

### 2.2 Overview
This application is built using a React frontend, an ASP.NET Core backend, and an SQL Server database. The architecture is designed for scalability and maintainability.

## 3. Technologies Used
- **Frontend**: React, Typescript, Axios
- **Backend**: ASP.NET Core, Entity Framework Core
- **Database**: SQL Server
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: MobX
- **API Testing**: Postman

## 4. Application Features

### 4.1 User Management
- **Registration**: Users can register with their email and password.
- **Login**: Users can log in using their registered email and password.
- **Change Password**: Users can reset their passwords while logged in or out.
- **Email Verification**: A verification email is sent upon registration and password resets.

### 4.2 Image Management
- **Upload**: Users can upload images with titles, descriptions, and categories.
- **Gallery View**: Images are displayed in a grid format.
- **Image Details**: Users can view image details by clicking on them.
- **Delete**: Users can delete their uploaded images.
- **Comments**: Users can leave comments on images and delete their comments.
- **Profiles**: Users can set images from their library as profile pictures.

### 4.3 Frontend Validations
- Validations are applied for image titles, descriptions, and categories.
- Validations are applied for login and registration credentials.
- Client-side validation messages are displayed for user feedback.

### 4.4 Pagination
The application implements pagination for loading images in chunks.

## 5. User Roles and Permissions
- **User**: Can upload and manage their own images, leave comments, and view galleries.

## 6. API Endpoints

| Endpoint                                      | Method | Description                                |
|-----------------------------------------------|--------|--------------------------------------------|
| /api/account/register                         | POST   | Register a new user                        |
| /api/account/login                            | POST   | Log in an existing user                    |
| /api/account/verifyEmail                      | POST   | Send verification email                    |  
| /api/account/resendEmailConfirmLink           | POST   | Resend verification email                  |
| /api/account/                                 | GET    | Get currently logged-in user               |
| /api/account/refreshToken                     | POST   | Send refresh token                         |
| /api/account/forgotPassword                   | POST   | Send password reset link                   |
| /api/account/resetPassword                    | POST   | Send a new password                        |
| /api/categories/                              | GET    | Get all categories                         |
| /api/categories/(id)                          | GET    | Get individual category by ID              |
| /api/categories/                              | POST   | Create a new category                      |
| /api/categories/(id)                          | PUT    | Edit a category name                       |
| /api/categories/(id)                          | DELETE | Delete a category                          |
| /api/follow/(username)                        | POST   | Follow a user                              |
| /api/follow/(username)                        | GET    | Get user followers                         |
| /api/photos/                                  | POST   | Upload a photo                             |
| /api/photos/(id)                              | DELETE | Delete a photo                             |
| /api/photos/(id)/setMain                      | POST   | Set a photo as a profile picture           |
| /api/photos/                                  | GET    | Get all photos in the database             |
| /api/photos/(username)                        | GET    | Get photos uploaded by a user              |
| /api/profiles/(username)                      | GET    | Get a user’s profile                       |

### Example API Request
**Register User:**
```
POST https://localhost:5000/api/account/register
{
   "fullname": "Charmaine Mogotlane",
   "username": "Maine",
   "password": "Pa$$w0rd"            
}
```

## 7. Setup Instructions

### 7.1 Prerequisites
- .NET SDK
- Node.js
- SQL Server

### 7.2 Configuration Steps
1. Clone the repository .
2. Open SQL Server Management Studio (SSMS) and create a new database named `ImageGallery`.
   ```sql
   CREATE DATABASE ImageGallery;
   ```
3. Configure connection strings in `appsettings.json` (API/Backend).
   ```json
   {
       "ConnectionStrings": {
           "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=ImageGallery;Trusted_Connection=True;"
       }
   }
   ```
   Replace `YOUR_SERVER_NAME` with the name of your SQL Server instance.
4. Install frontend dependencies:
   ```bash
   cd client-app
   npm install
   ```
5. Migrate the database:
   ```bash
   cd api
   dotnet ef database update
   ```

## 8. Running the Application

### 8.1 Backend
1. Open the terminal in Visual Studio Code (VSCode) and navigate to the root folder of the project:
   ```
   PS C:\Users\CMogotlane.SINGULAR\IMGALLERY\ImageGallery>
   ```
2. Add a Migration: Run the following command to create a migration:
   ```bash
   dotnet ef migrations add IMGAPP -p Persistence -s API
   ```
3. Update the database: After a successful migration, navigate to the API project directory.
   ```bash
   cd API
   ```
4. Run the database update:
   ```bash
   dotnet ef database update
   ```
5. Run the Application: To ensure there are no build errors, run:
   ```bash
   dotnet watch
   ```
   After confirming that there are no build errors, stop the process using `Ctrl + C`.
6. Finally, run the application:
   ```bash
   dotnet run
   ```
   The API will be hosted on `https://localhost:5000`.

### 8.2 Frontend
Start the frontend development server:
```bash
cd client-app
npm run dev || npm start
```

## 9. Bonus Features
- **Verification Email**: Sent upon user registration for confirmation.
- **Comments on Images**: Users can leave comments on images.
- **User Profiles**: Users can manage their profiles and set profile pictures.
- **User Followings**: Users can follow each other.
- **Pagination**: Users can view images in chunks using paged lists.
