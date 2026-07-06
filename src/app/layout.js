import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata = {
  title: "Upwork Employee Record",
  description: "Employee Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}