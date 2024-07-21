# React Application for Issue Management

This project is a React-based web application designed to manage issues within a system. The application includes features for user authentication, issue tracking, and managing user roles and assignments. Below is a detailed guide on how to run the application locally, along with an overview of the features implemented beyond the initial requirements.

> If you want to use the hosted version of this app [Click Here](https://zsubzwary.github.io/frontend-test/) 

## Table of Contents
1. [Features](#features)
2. [Setup Instructions](#setup-instructions)
3. [Project Structure](#project-structure)
4. [Running the Application](#running-the-application)
5. [Usage](#usage)
6. [Enhancements](#enhancements)

## Features

### Core Features
- **User Authentication**: Users can log in, stay logged in with the "keep me logged in" option, and log out.
- **Left Navigation Menu**: Includes hover and select functionality with appropriate color changes.
- **Issues Page**: Users can fill out a form with various fields including text, dropdowns, and number inputs to create an issue.
- **Role Assignment**: Assign roles to users, coupled with email and phone numbers, and manage these assignments.
- **Dark Mode**: Users can use the app in Dark mode. _(static assets like images are yet pending for dark-mode)_


### Additional Enhancements
1. **Bulk Delete Feature**: Users can bulk delete contacts in the issue assignment table.
2. **DatePicker**: A DatePicker component is used for date inputs instead of a simple text field.
3. **Event-Based SnackBar**: A reusable SnackBar component for notifications throughout the project.
4. **Event-Based AlertDialog**: A reusable AlertDialog component for confirmations and alerts.
5. **Data Validation**: Enhanced validation before saving data to ensure data integrity.

## Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- npm (v9 or above)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/zsubzwary/frontend-test.git
   cd frontend-test
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Project Structure

```sh
├── public
│   ├── 404.html
│   ├── electrified_gingerbread_man.gif
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── assets
│   │   ├── eye.svg
│   │   ├── login.svg
│   │   ├── logo.svg
│   │   ├── password-lock.svg
│   │   └── username.svg
│   ├── components
│   │   ├── common
│   │   │   ├── AlertDialog.js
│   │   │   ├── DarkModeSwitch.js
│   │   │   └── GlobalSnackBar.js
│   │   ├── issue
│   │   │   ├── AssignIssueContact.js
│   │   │   ├── CreateIssue.js
│   │   │   └── IssueContactDataGrid.js
│   │   ├── layout
│   │   │   └── MainLayout.js
│   │   └── NavigationMenu.js
│   ├── css
│   │   └── issue-page.css
│   ├── events
│   │   ├── AlertDialogEmitter.js
│   │   ├── EventEmitter.js
│   │   └── SnackBarEmitter.js
│   ├── pages
│   │   ├── Blank.js
│   │   ├── Dashboard.js
│   │   ├── Issues.js
│   │   └── Login.js
│   ├── themes
│   │   ├── Dark.js
│   │   ├── Default.js
│   │   └── Light.js
│   ├── util
│   │   ├── Helper.js
│   │   ├── MockData.js
│   │   └── ProtectedRoutes.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── README.md
├── package-lock.json
└── package.json
```

## Running the Application

1. Start the development server:
   ```sh
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000/frontend-test`.

## Usage

### Logging In
- Enter your credentials on the login page.
  - Any username having length b/w 6 & 20 while valid characters are english alphabets, numbers, hypen _(dash)_ & underscore.
  - Any password having length b/w 8 & 30
  - Example Login would be username `john_adam` having password `securePassword`
- Use the "eye" icon to view the password.
- Check "Keep me logged in" to stay logged in across browser sessions.

### Navigating
- Hover over the left navigation menu to expand it.
- Click on sections to navigate to different pages. Only the Issues page has content.

### Issues Page
- Fill out the form with details including priority, status, and other fields.
- Assign roles to users and manage these assignments with add/remove and bulk delete features.
- Use the DatePicker for selecting dates.
- Save your work, which is stored in the browser.

### Alerts and Notifications
- SnackBars are used for quick & short notifications.
- AlertDialogs are used for confirmations.

## Enhancements

### Bulk Delete Feature
Allows users to select and delete multiple contacts in the issue assignment table at once, enhancing user productivity.

### DatePicker
Provides a user-friendly way to select dates, improving the overall user experience.

### Event-Based SnackBar
A reusable notification component that can be triggered from anywhere in the application, providing consistent feedback to users.

### Event-Based AlertDialog
A reusable dialog component for confirmations and alerts, enhancing consistency and reducing redundancy.

### Data Validation
Ensures that all input data is validated before saving, improving data integrity and reducing errors.

---

This project was developed with a focus on usability, maintainability, and scalability. The additional features and enhancements aim to provide a more robust and user-friendly experience. For any questions or contributions, feel free to reach out or submit a pull request.

Happy coding!
