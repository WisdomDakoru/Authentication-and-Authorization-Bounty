document.getElementById("register-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    
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
            alert("Error registering user");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    
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
            alert("Error logging in");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById("delete-user-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("delete-username").value;
    const token = localStorage.getItem("token");

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
        } else {
            alert("Error deleting user");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
