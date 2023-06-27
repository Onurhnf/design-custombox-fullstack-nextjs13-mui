import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import NavBar from "@/components/NavBar.component";

export const metadata = {
  title: "Custom Box",
  description: "Case",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
