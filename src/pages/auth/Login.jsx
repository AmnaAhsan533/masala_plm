
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    const destination = location.state?.from?.pathname || "/";

    navigate(destination, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-10">
      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-orange-600">
            Masala<span className="text-gray-900">PLM</span>
          </h1>

          <p className="mt-2 text-xs font-semibold tracking-[0.2em] text-gray-400">
            PRODUCT LIFECYCLE MANAGEMENT
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-xl shadow-orange-100/40 sm:p-9">
          <div className="mb-7">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <LockKeyhole size={23} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to access your product development workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@masalaplm.com"
                  autoComplete="username"
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-gray-200 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Continue to workspace
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Demo Credentials */}
          {/* <div className="mt-7 rounded-xl border border-dashed border-orange-200 bg-orange-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">
              Demo account
            </p>

            <div className="mt-3 space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Email:</span>{" "}
                admin@masalaplm.com
              </p>

              <p>
                <span className="font-medium">Password:</span>{" "}
                Admin@123
              </p>
            </div>
          </div> */}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} MasalaPLM. All rights reserved.
        </p>
      </div>
    </div>
  );
}
