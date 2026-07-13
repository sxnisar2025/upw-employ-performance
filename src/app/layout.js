import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";

import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Upwork Employee Record",
  description: "Employee Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AppProvider>
            {children}

            <Toaster
              position="top-right"
              reverseOrder={false}
            />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}