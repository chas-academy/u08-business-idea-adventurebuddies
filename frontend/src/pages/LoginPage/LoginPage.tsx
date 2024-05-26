// import React, { useState } from "react";

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   return (
//     <>
//       <h1 className="text-lg font-bold mb-4">LOGGA IN HÄR</h1>
//       <div className="absolute w-[630px] h-[450px] left-1/2 transform -translate-x-1/2 top-[237.39px]" />
//       <form onSubmit={handleSubmit}>
//         <div className="space-y-4 mt-4">
//           <label htmlFor="username">Användarnamn:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </div>
//         <br></br>
//         <div className="space-y-4 mt-4">
//           <label htmlFor="password">Lösenord:</label>
//           <br></br>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//         </div>
//         <br></br>
//         <button type="submit">Login</button>
//       </form>
//     </>
//   );
// };

// export default LoginPage;

import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <>
      <h1 className="text-center mb-4 font-poppins font-bold text-2xl leading-12 text-black">
        Logga
      </h1>
      <div className="absolute w-[630px] h-[450px] left-1/2 transform -translate-x-1/2 top-[237.39px] bg-gray shadow-md rounded-md p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Användarnamn:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-2/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Lösenord:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-2/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-1/5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
