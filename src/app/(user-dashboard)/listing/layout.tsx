import type { ReactNode } from "react";
import  { Toaster } from "react-hot-toast";
import Navbar from "./(components)/Navbar";



// Define props type
type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
 <html lang="en">
  <body className={`!overflow-x-hidden bg-[#0A0C0B]`}>
     <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'white',
              color: 'black',
            },
            success: {
              duration: 3000,
              
            },
          }}
        />
        <Navbar/>
    <main>{children}</main>
  </body>
</html>

  );
}
