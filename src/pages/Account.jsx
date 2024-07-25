import React from "react";
import { useFirebase } from "../context/Firebase"; // Assuming Firebase context

function Account() {
  const firebase = useFirebase();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="shadow-xl rounded-xl overflow-hidden bg-white px-8 py-6 max-w-sm w-full">
        <h1 className="text-2xl font-medium mb-4 text-center">
          Account Details
        </h1>
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Email:</span>
            <span className="text-gray-500">{firebase.user?.email}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Display Name:</span>
            <span className="text-gray-500">
              {firebase.user?.displayName || "Not Set"}
            </span>
          </li>
          {/* Add your additional fields here */}
          <li className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Phone Number:</span>
            <span className="text-gray-500">
              {firebase.user?.phoneNumber || "Not Set"}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-gray-700 font-semibold">Photo URL:</span>
            <span className="text-gray-500">
              {firebase.user?.photoURL || "Not Set"}
            </span>
          </li>
        </ul>
        <button
          className="mt-4 block w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={firebase.handleSignOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Account;
