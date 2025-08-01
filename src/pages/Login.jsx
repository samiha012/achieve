import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/check`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user.role === 'superadmin') {
            navigate("/admin/courses", { replace: true });
          } else {
            navigate("/admin/courses", { replace: true });
          }
        }
      } catch (err) {
        // Not logged in, server down, invalid token handle

      }
    };
    checkLogin();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userData = await login(email, password);
      // Handle redirect based on role after successful login
      if (userData.role === 'superadmin') {
        navigate("/admin/courses", { replace: true });
      } else {
        navigate("/admin/courses", { replace: true });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ maxWidth: 400, margin: "80px auto", background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
      <h2 style={{ marginBottom: 24, color: '#1976d2' }}>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" style={{ width: '100%' }} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login; 