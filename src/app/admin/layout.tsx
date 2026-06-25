"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Session {
  authenticated: boolean;
  role?: string;
}

const sidebarLinks = [
  { href: "/admin", label: "Oorsig", icon: "📊" },
  { href: "/admin/tuisblad", label: "Tuisblad", icon: "🏠" },
  { href: "/admin/bybelstudies", label: "Bybelstudies", icon: "📖" },
  { href: "/admin/gebeurtenisse", label: "Gebeurtenisse", icon: "📅" },
  { href: "/admin/winkel", label: "Winkel", icon: "🛍️" },
  { href: "/admin/vorms", label: "Vorms & Inskrywings", icon: "📋" },
  { href: "/admin/instellings", label: "Instellings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authError, setAuthError] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;
    let cancelled = false;
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) throw new Error("Auth failed");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (!data.authenticated) {
          router.push("/admin/login");
        } else {
          setSession(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setAuthError(true);
        }
      });
    return () => { cancelled = true; };
  }, [router, isLoginPage]);

  // Don't apply admin layout to login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-blush">
        {authError ? (
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-4">Kon nie verifieer nie</p>
            <button onClick={() => { setAuthError(false); router.push("/admin/login"); }} className="btn-primary">
              Gaan na Aanmelding
            </button>
          </div>
        ) : (
          <p className="text-brand-muted">Laai...</p>
        )}
      </div>
    );
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-brand-blush flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-brand-cream transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-brand-cream">
          <Link href="/admin" className="font-heading text-2xl text-brand-red font-bold">
            ♡ Admin
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-brand-red text-white"
                  : "text-brand-ink hover:bg-brand-cream"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
          <hr className="my-4 border-brand-cream" />
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-brand-muted hover:bg-brand-cream transition-colors"
          >
            <span>🏡</span>
            Publieke Werf
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-brand-red hover:bg-red-50 w-full text-left transition-colors"
          >
            <span>🚪</span>
            Teken Uit
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-brand-cream px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-brand-ink hover:text-brand-red"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="text-sm text-brand-muted">
            Aangemeld as <span className="font-medium text-brand-ink">{session.role}</span>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
