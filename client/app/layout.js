import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import dotenv from "dotenv"
import axios from "axios";
import Navbar from '../components/Navbar';
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


export const metadata = {
  title: 'MyShop',
  description: 'E-commerce app ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar */}
        <Navbar />
         <ToastContainer position="top-right" autoClose={3000} />

        {/* Main content */}
        <main>{children}</main>
        
        <Footer/>
      </body>
    </html>
  );
}