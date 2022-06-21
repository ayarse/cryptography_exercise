/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PasswordCracker from "./pages/PasswordCracker";
import { CreditCardValidator } from "./pages/CreditCardValidator";
import { CreditCardIcon, KeyIcon, PuzzleIcon } from "@heroicons/react/outline";
import HammingCode from "./pages/HammingCode";

const routes = [
  {
    title: "Credit Card Validator",
    url: "/",
    icon: <CreditCardIcon className="w-6 inline-block mr-2" />,
    component: <CreditCardValidator />,
  },
  {
    title: "Hamming Code",
    url: "/about",
    icon: <PuzzleIcon className="w-6 inline-block mr-2" />,
    component: <HammingCode />,
  },
  {
    title: "Password Cracker",
    url: "/home",
    icon: <KeyIcon className="w-6 inline-block mr-2" />,
    component: <PasswordCracker />,
  },
];

function App() {
  return (
    <div className="bg-indigo-800 bg-gradient-to-r from-indigo-500 to-cyan-500">
      <div className="container flex flex-col justify-center mx-auto py-24 px-5 h-screen">
        <div className="grid grid-cols-4 h-full shadow-lg rounded-lg bg-white mt-5 overflow-hidden">
          <nav className="col-span-1 flex flex-col bg-indigo-100 p-4">
            <Header />
            {routes.map((route) => (
              <NavLink
                key={route.url}
                className={({ isActive }: { isActive: boolean }) => {
                  let base =
                    "px-4 mb-2 py-2 rounded-md transition-all hover:bg-white hover:scale-105 text-indigo-900 hover:text-indigo-900 ";
                  if (isActive) base += "bg-white";
                  return base;
                }}
                to={route.url}
              >
                {route.icon}
                {route.title}
              </NavLink>
            ))}
          </nav>
          <div className="col-span-3 bg-white overflow-hidden">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.url}
                  path={route.url}
                  element={route.component}
                />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
