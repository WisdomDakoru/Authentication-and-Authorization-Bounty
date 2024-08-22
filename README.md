# User Management App

## Overview

This application is designed to demonstrate the consequences of improper authorization in user management systems. After authentication, any user is allowed to delete any other user's account via a simple prompt on the frontend. This setup creates a scenario where every authenticated user can potentially cause havoc by deleting accounts, highlighting the importance of distinguishing between authentication and authorization in web security.

## How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/WisdomDakoru/Authentication-and-Authorization-Bounty
cd delete-user-app
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Set Up Environment Variables
Create a .env file in the root directory of your project and add the following environment variables:
```plaintext
TOKEN_KEY="StackUpAuthenticationProject!"
PORT=4001
```
### 4. Start the Server
Start the server to run the application:
```bash
node server.js
```
### 5. Access the Application
Open your web browser and navigate to http://localhost:4001/ to use the application. You will be able to register, log in, and delete user accounts as described in the app’s functionality.

# Challenge Part 2: Analysis of User Deletion After Authentication
## Introduction
In this application, we consider the requirement that "this delete user functionality can be done after authentication." This requirement raises important problems concerning the distinction between authentication and authorization, two fundamental concepts in secure web applications. Understanding the difference between the two is critical when evaluating the security implications of allowing users to delete accounts after authentication.

## Understanding Authentication vs. Authorization
### Authentication
- **Definition**: Authentication is the process of verifying the identity of a user. This is usually done through credentials like a username and password. Upon successful authentication, the system confirms that the user is who they claim to be.
- Example: A user logs in by providing their email and password, and the system verifies that these credentials are correct.

### Authorization
- Definition: Authorization is the process of determining what an authenticated user is allowed to do within the system. It deals with access control, ensuring that users can only perform actions or access resources that they are permitted to.
- Example: After logging in (authentication), the system checks if the user has the appropriate permissions to delete a user account (authorization).

## Analysis of the Deletion Requirement
### Is Deleting Users After Authentication a Good Idea?
Allowing user deletion **after authentication alone** can introduce significant security risks and is generally **not a good idea**. Here's why:

### 1. Insufficient Security:
Authentication alone confirms the identity of a user but doesn't guarantee they have the necessary permissions to perform certain actions—such as deleting other user accounts. Without a proper authorization check, any authenticated user could potentially delete other accounts, leading to security breaches and unintended consequences.

### 2. Need for Authorization:
Authorization is essential in this scenario. User deletion should only be allowed based on roles or permissions. For example, only administrators or users with specific privileges should be able to delete user accounts. This prevents unauthorized actions and protects user data.

### 3. Potential for Abuse:
Without authorization checks, authenticated users could cause havoc by deleting accounts they shouldn’t have access to. This could lead to data loss, service disruption, or even malicious attacks on the system. Authorization mechanisms ensure that only users with the proper clearance can perform sensitive operations like account deletion.

### Correct Approach
A better approach would be to combine both authentication and authorization:
- Authentication: Ensures the user is who they claim to be.
- Authorization: Ensures the user has the right permissions (e.g., admin privileges) to perform sensitive actions like deleting user accounts.

For example, the deletion route should first authenticate the user and then check their role or permissions to determine whether they are authorized to delete another user.
```javascripte
router.post(
    "/delete/user",
    authentication,
    authorization({ isAdmin: true }),
    (req, res) => authController.delete_user_by_username(req, res),
);
```
Here, the authorization route checks if the authenticated user is an admin before allowing them to proceed with deleting another user.
## Conclusion
In conclusion, allowing users to delete accounts after only being authenticated is not a good practice. Authentication verifies the user’s identity, but authorization ensures they have the correct permissions to perform specific actions. The two concepts work hand-in-hand to secure a system properly. Neglecting authorization can lead to serious security issues, including unauthorized access and potential data loss.

Incorporating robust authorization checks will ensure that sensitive operations, such as user deletion, are performed securely and by the right people.
