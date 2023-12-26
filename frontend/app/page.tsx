"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "./components/CardComponent";
import exp from "constants";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  //fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/users`, newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  //update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return { ...user, name: updateUser.name, email: updateUser.email };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  //delete user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <main className="flex flex-col items-center py-4 min-h-screen  bg-gray-100">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 text-center my-4">
          👤User Management App👤
        </h1>
        <div className="flex flex-row space-x-4  ">
          {/* Create user */}
          <form
            onSubmit={createUser}
            className="p-4 bg-blue-100 rounded-xl shadow-2xl  "
          >
            <input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-blue-500  hover:bg-blue-600 rounded-xl "
            >
              Add User
            </button>
          </form>

          {/* Update user */}
          <form
            onSubmit={handleUpdateUser}
            className="p-4 bg-green-100  shadow-2xl  rounded-xl"
          >
            <input
              placeholder="User ID"
              value={updateUser.id}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, id: e.target.value })
              }
              className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              placeholder="New Name"
              value={updateUser.name}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, name: e.target.value })
              }
              className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              placeholder="New Email"
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
              className="mb-2 w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              className="w-full p-2 text-white bg-green-500 rounded-xl hover:bg-green-600"
            >
              Update User
            </button>
          </form>
        </div>
        {/* Display users */}
        <h1 className="text-2xl font-bold text-gray-800 text-center my-4">
          User List :-📃
        </h1>
        <div className="flex flex-col items-center justify-center space-y-2 ">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between cursor-pointer bg-white hover:bg-slate-100 px-4 py-2 rounded-lg shadow-md ani "
            >
              <CardComponent card={user} />

              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl cursor-pointer mx-6"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
