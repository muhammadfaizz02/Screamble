import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../modules/fetch";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, [window.localStorage.getItem("token")]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex w-full items-center justify-between p-4 bg-gray-800 text-white">
      <Link to="/">
        <div className="flex items-center cursor-pointer">
          <span className="text-xl font-bold">SCREAMBLE</span>
        </div>
      </Link>
      <div className="flex space-x-4">
        {isLogin && (
          <Link to="/products/new">
            <button className="bg-blue-500 bg-opacity-50 px-4 py-2 text-white">
              Create New Product
            </button>
          </Link>
        )}
        {!isLogin ? (
          <button
            onClick={openModal}
            className="bg-blue-500 px-4 py-2 text-white"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/");
            }}
            className="bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <form
            id="login-form"
            className="bg-gray-900 p-6 text-white shadow-md w-96"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const token = await loginUser(
                  e.target.email.value,
                  e.target.password.value
                );
                window.localStorage.setItem("token", token.token);
                navigate("/");
                closeModal();
              } catch (err) {
                console.error(err);
                // Handle error
              }
            }}
          >
            <div className="flex mb-4">
              <button
                type="button"
                className="text-white mr-10"
                onClick={closeModal}
              >
                ✖
              </button>
              <h2 className="text-2xl text-center font-semibold">Login</h2>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-md md:text-lg lg:text-lg 2xl:text-lg font-medium">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="mt-1 p-2 w-full border bg-gray-800"
                placeholder="Masukkan Email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white text-md md:text-lg lg:text-lg 2xl:text-lg font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 p-2 w-full border bg-gray-800"
                placeholder="Masukkan Password"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                form="login-form"
                className="bg-blue-500 text-white px-10 py-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
