import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
<Toaster
  position="top-right"
  reverseOrder={false}
/>

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

          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </AppProvider>
      </body>
    </html>
  );
}