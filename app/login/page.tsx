"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Globe2, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          left: "-20%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-primary-muted) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-secondary-muted) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 400,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "var(--radius-xl)",
              background: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 800,
              color: "#fff",
              margin: "0 auto 1rem",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            SS
          </div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              margin: "0 0 0.375rem",
            }}
          >
            SenangSync
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-text-muted)", margin: 0 }}>
            Business OS untuk Malaysian SME 🇲🇾
          </p>
        </div>

        {/* Card */}
        <div
          className="card-glass"
          style={{ padding: "1.75rem", border: "1px solid var(--color-border-strong)" }}
        >
          {/* Mode toggle */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              background: "var(--color-surface-raised)",
              borderRadius: "var(--radius-md)",
              padding: "4px",
              marginBottom: "1.5rem",
            }}
          >
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: "0.625rem",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  background: mode === m ? "var(--color-surface-overlay)" : "transparent",
                  color: mode === m ? "var(--color-text-primary)" : "var(--color-text-muted)",
                  fontSize: "0.875rem",
                  fontWeight: mode === m ? 600 : 500,
                  cursor: "pointer",
                  transition: "all var(--transition-fast)",
                }}
              >
                {m === "login" ? "Log Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          {/* Google SSO */}
          <button
            className="btn btn-secondary"
            style={{ width: "100%", gap: "0.625rem", marginBottom: "1rem" }}
          >
            <Globe2 size={18} />
            {mode === "login" ? "Log masuk dengan Google" : "Daftar dengan Google"}
          </button>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1rem",
            }}
          >
            <div className="divider" />
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", flexShrink: 0 }}>
              atau
            </span>
            <div className="divider" />
          </div>

          {/* Email field */}
          <div style={{ marginBottom: "0.875rem" }}>
            <label htmlFor="email">Emel</label>
            <div style={{ position: "relative" }}>
              <Mail
                size={16}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)",
                }}
              />
              <input
                id="email"
                type="email"
                className="input"
                style={{ paddingLeft: "2.625rem" }}
                placeholder="nama@email.com"
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label htmlFor="password">Kata Laluan</label>
            <div style={{ position: "relative" }}>
              <Lock
                size={16}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)",
                }}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input"
                style={{ paddingLeft: "2.625rem", paddingRight: "2.875rem" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-text-muted)",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Link
            href="/dashboard"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", justifyContent: "center", gap: "0.5rem" }}
          >
            {mode === "login" ? "Log Masuk" : "Cipta Akaun"}
            <ArrowRight size={16} />
          </Link>

          {mode === "login" && (
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <a
                href="#"
                style={{ fontSize: "0.8125rem", color: "var(--color-primary)", fontWeight: 500 }}
              >
                Lupa kata laluan?
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
          }}
        >
          Dengan mendaftar, kau bersetuju dengan{" "}
          <a href="#" style={{ color: "var(--color-primary)", fontWeight: 500 }}>
            Syarat Perkhidmatan
          </a>{" "}
          kami.
        </p>
      </div>
    </div>
  );
}
