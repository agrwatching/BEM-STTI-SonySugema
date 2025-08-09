import "@/app/globals.css";
import Script from "next/script";

export const metadata = {
  title: "Login | Senat STTI Sony Sugema",
  description: "Halaman login untuk dashboard Senat STTI Sony Sugema",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Script reCAPTCHA */}
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="">
        {children}
      </body>
    </html>
  );
}
