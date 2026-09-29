import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body>
      {/* <Navbar /> */}

       <div className="flex">

                    {/* <Sidebar /> */}

                    <main className="flex-1 p-6">
                        {children}
                    </main>

                </div>

         <Toaster
        position="top-right"
    />
        
      </body>
    </html>
  );
}