import React, { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { useAuth } from "../../auth/auth-context";

function Body() {
  const [hidePassword, setHidePassword] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();

    let valid = true;
    let newError = "";

    if (username === "" || password === "") {
      newError = "Fields cannot be empty";
      valid = false;
    }

    setError(newError);

    if (valid) {
      try {
        await login(username, password);
      } catch (error) {
        setError("Login failed");
      }
    }
  };

  return (
    <form className="flex flex-col mt-10 gap-y-3">
      <div>
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          autoComplete="off"
          className={`focus:outline-0 text-sm border border-1 w-full p-2 ps-4 rounded-lg h-[40px] ${username === "" && error !== "" ? 'border-red-500' : 'border-gray-200'}`} 
        />
      </div>
      <div className="flex flex-col w-full">
        <div className={`flex flex-row justify-between w-full p-2 border border-1 rounded-lg h-[40px] bg-white ${password === "" && error !== "" ? 'border-red-500' : 'border-gray-200'}`}>
          <input 
            type={hidePassword ? "password" : "text"}
            placeholder="Password" 
            className="focus:outline-0 text-sm w-full p-2"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {hidePassword 
              ? <IoEyeOffOutline /> 
              : <IoEyeOutline />
            }
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
            <IoIosInformationCircle size={14}/> {error}
          </p>
        )}
      </div>
      <button className="focus:outline-0 text-sm p-2 rounded-lg mt-3 text-white bg-accent" onClick={handleLogIn}>Log In</button>
    </form>
  );
}

export default Body;
