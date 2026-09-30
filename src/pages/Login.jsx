import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [rememberUser, setRememberUser] =
    useState(false);

  const [error, setError] =
    useState("");

  // Remember User
  useEffect(() => {

    const savedUsername =
      localStorage.getItem(
        "rememberedUsername"
      );

    if (savedUsername) {
      setUsername(savedUsername);
      setRememberUser(true);
    }

  }, []);

  // Password Strength
  const getPasswordStrength = () => {

    if (password.length === 0) {
      return {
        text: "",
        className: "",
      };
    }

    if (password.length < 5) {
      return {
        text: "Weak",
        className: "weak",
      };
    }

    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return {
        text: "Strong",
        className: "strong",
      };
    }

    return {
      text: "Medium",
      className: "medium",
    };
  };

  const strength =
    getPasswordStrength();

  // Login
  const handleLogin = (e) => {

    e.preventDefault();

    setError("");

    // Username validation
    if (!username.trim()) {
      setError(
        "Username is required."
      );
      return;
    }

    // Password validation
    if (!password.trim()) {
      setError(
        "Password is required."
      );
      return;
    }

    // Demo authentication
    if (
      username === "admin" &&
      password === "1234"
    ) {

      // Simulated JWT
      const header = btoa(
        JSON.stringify({
          alg: "HS256",
          typ: "JWT",
        })
      );

      const payload = btoa(
        JSON.stringify({
          username: username,
          role: "admin",
          loginTime:
            new Date().toISOString(),
        })
      );

      const signature =
        "SIMULATED_SIGNATURE";

      const fakeJWT =
        `${header}.${payload}.${signature}`;

      // Store JWT
      localStorage.setItem(
        "jwtToken",
        fakeJWT
      );

      // Store logged-in user
      localStorage.setItem(
        "loggedInUser",
        username
      );

      // Remember username
      if (rememberUser) {

        localStorage.setItem(
          "rememberedUsername",
          username
        );

      } else {

        localStorage.removeItem(
          "rememberedUsername"
        );
      }

      navigate("/dashboard");

    } else {

      setError(
        "Invalid username or password."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>
          Task Manager
        </h1>

        <p>
          Authentication System
        </p>

        <form onSubmit={handleLogin}>

          {/* Username */}

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          {/* Password */}

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* Password Strength */}

          {password && (
            <div
              className={`password-strength ${strength.className}`}
            >
              Password Strength:{" "}
              <strong>
                {strength.text}
              </strong>
            </div>
          )}

          {/* Remember User */}

          <label className="remember-label">

            <input
              type="checkbox"
              checked={rememberUser}
              onChange={(e) =>
                setRememberUser(
                  e.target.checked
                )
              }
            />

            Remember Me

          </label>

          {/* Error */}

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit">
            Login
          </button>

        </form>

        <div className="login-hint">

          <strong>
            Demo Login
          </strong>

          <br />

          Username: admin

          <br />

          Password: 1234

        </div>

      </div>

    </div>
  );
}

export default Login;
