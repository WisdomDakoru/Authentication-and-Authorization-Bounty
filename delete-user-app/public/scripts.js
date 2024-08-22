// Handle user registration
document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (!username || !password) {
        alert("Username and password are required");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4001/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert("User registered successfully");
        } else {
            const errorData = await response.json();
            alert(`Error registering user: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering. Please try again.");
    }
});

// Handle user login
document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Username and password are required");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4001/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token); // Store token in localStorage
            alert("Logged in successfully");
        } else {
            const errorData = await response.json();
            alert(`Error logging in: ${errorData.message || "Invalid username or password"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while logging in. Please try again.");
    }
});

// Handle user deletion
document.getElementById("delete-user-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("delete-username").value;
    const token = localStorage.getItem("token");

    if (!username) {
        alert("Username is required to delete a user");
        return;
    }

    if (!token) {
        alert("You must be logged in to delete a user");
        return;
    }

    try {
        const response = await fetch(`http://localhost:4001/auth/delete/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ username })
        });

        if (response.ok) {
            alert("User deleted successfully");
        } else if (response.status === 404) {
            alert("Error: User not found");
        } else if (response.status === 403) {
            alert("Error: You are not authorized to delete this user");
        } else {
            const errorData = await response.json();
            alert(`Error deleting user: ${errorData.message || "Unknown error"}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while deleting the user. Please try again.");
    }
});