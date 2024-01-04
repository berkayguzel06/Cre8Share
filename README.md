
![image](https://github.com/berkayguzel06/Cre8Share/assets/98205992/1b748cec-f959-4b05-93f8-16d214d441a8)

## Project Overview

### Project Name: Cre8Share

### Project Description
The SocialMediaApp is a web-based social media application that enables users to connect with each other through a variety of features. The application is built with React for the frontend, Node.js for the backend, and MySQL for the database. Users can register, login, upload posts, manage profiles, engage in social interactions, categorize posts, and use an image generator.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js
- **Database:** MySQL

## Features

### User Authentication
- User registration and account creation.
- Login functionality.

![İsimsiz video ‐ Clipchamp ile yapıldı](https://github.com/berkayguzel06/Cre8Share/assets/134441532/3b75ad9e-8671-4451-8d20-2d17bf977b4d)


### Post Management
- Post creation and upload functionality.
- Display of uploaded posts on the home page.
- Post deletion capability.

### User Profile
- Account information editing for users.
- Profile deletion functionality.

### Social Interactions
- Like and report features for posts.
- User following functionality.
- Comments can be added to posts.

### Post Categorization
- Users can categorize posts by adding tags.

### Image Generator
- Dedicated tab for image generation.
- Users can input prompts and adjust image size.
- Direct sharing of generated images.

![image](https://github.com/berkayguzel06/Cre8Share/assets/98205992/a127f136-7193-4e12-b3a9-4881265add26)

#### HuggingFace Diffusers Library
The image generation feature in the SocialMediaApp is powered by the HuggingFace Diffusers library, utilizing advanced safetensor image models. This library enhances the quality and safety of image generation, providing a robust foundation for creating visually appealing and secure images.

#### Python Virtual Environment (venv) and Server-Side Process
The image generation process involves a Python virtual environment (venv) that is dynamically created and managed by the server. The backend server executes a series of steps during the first run to ensure a controlled and isolated environment for image generation:

1. **Creation of Virtual Environment (venv):**
   - The server sends a command to create a virtual environment in the project folder.
   - This virtual environment is essential for isolating dependencies and ensuring reproducibility.

2. **Activation of Virtual Environment:**
   - Once created, the server activates the virtual environment, isolating the image generation process.

3. **Dependency Installation:**
   - Dependencies required for image generation are installed into the virtual environment using a `requirements.txt` file.
   - This step ensures that the necessary Python packages, including the HuggingFace Diffusers library, are available within the isolated environment.

4. **Execution of Python Script:**
   - With the virtual environment activated and dependencies installed, the server runs a Python script responsible for image generation.
   - The data required for image generation is passed from the frontend to the backend.


## Development Stack

- **Frontend Development:**
  - React for building the user interface.

- **Backend Development:**
  - Node.js for server-side development.

- **Database:**
  - MySQL for storing user and post-related data.

## Project Structure

1. **Frontend:**
   - React components for the user interface.
   - Routing for different pages and features.

2. **Backend:**
   - Node.js server handling authentication, post management, and social interactions.
   - APIs for frontend-backend communication.

3. **Database:**
   - MySQL database for storing user profiles, posts, and related data.

4. **Image Generator:**
   - Module for image generation with adjustable parameters.
