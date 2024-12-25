import { useState } from "react";
import PropTypes from "prop-types";
import "../App.css"; // Ensure the correct import of App.css

const LoginForm = ({ show, onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!show) return null;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onLogin(username, password);
            setUsername("");
            setPassword("");
        } catch (err) {
            setError(err.message || "Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-form-container">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    show: PropTypes.bool.isRequired,
    onLogin: PropTypes.func.isRequired,
};

export default LoginForm;
