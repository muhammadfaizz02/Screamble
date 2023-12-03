import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return;
        }
        try {
            setError(null);
            navigate("/");
        } catch (e) {
            setError(error?.message || "An error occurred");
        }
    };

    return (
        <div className="w-full py-4 px-24 mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4 text-white text-center">Register</h1>

            <div>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 mb-4">{error}</div>
                    )}

                    <div className="mb-4">
                        <label className="block text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="border-b-2 border-gray-700 text-white w-full p-2"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="border-b-2 border-gray-700 text-white w-full p-2"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white">Password</label>
                        <input
                            type="password"
                            className="border-b-2 border-gray-700 text-white w-full p-2"
                            placeholder="Enter a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white">Confirm Password</label>
                        <input
                            type="password"
                            className="border-b-2 border-gray-700 text-white w-full p-2"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {password !== confirmPassword && (
                            <p className="text-xs text-red-500">The password does not match</p>
                        )}
                    </div>

                    <button className="mt-6 bg-teal-500 text-white py-2 px-4 rounded" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
