import React, {useState} from 'react';
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const UsersContent = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer' }
    ]);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">{user.name}</td>
                            <td className="p-4">{user.email}</td>
                            <td className="p-4">{user.role}</td>
                            <td className="p-4 flex space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Edit"
                                >
                                    <AiOutlineEdit className="w-5 h-5" />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(user.id)}
                                    title="Delete"
                                >
                                    <AiOutlineDelete className="w-5 h-5" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersContent;