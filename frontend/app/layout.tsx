import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { cookies, headers } from "next/headers";
import { BrainConfigProvider } from "../lib/context/BrainConfigProvider/brain-config-provider";
import Footer from "./components/Footer";
import { NavBar } from "./components/NavBar";
import { ToastProvider } from "./components/ui/Toast";
import "./globals.css";
import SupabaseProvider from "./supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quivr - Get a Second Brain with Generative AI",
  description:
    "Quivr is your second brain in the cloud, designed to easily store and retrieve unstructured information.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body
        className={`bg-white text-black dark:bg-black dark:text-white w-full ${inter.className}`}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <ToastProvider>
          <SupabaseProvider session={session}>
            <BrainConfigProvider>
              <NavBar />
              <div style={{ flex: "1 0 auto" }}>{children}</div>
              <div style={{ position: "sticky", bottom: 0 }}>
                <Footer />
              </div>
            </BrainConfigProvider>
          </SupabaseProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  );
}
