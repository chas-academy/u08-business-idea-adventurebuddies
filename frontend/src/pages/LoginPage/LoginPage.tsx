import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleChange = (e) => setChecked(e.target.checked);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, checked });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-Poppins">
      <h1 className="text-center-primaryColor mb-4 leading-12 font-bold">
        Logga in
      </h1>
      {/* removed shadow-md from the div below */}
      <div className="box-border md:box-content bg-gray-200 rounded-md p-8 glass-container">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="username" className="text-sm font-medium">
              Användarnamn:
            </label>
            <div className="w-full border p-2 rounded border-[#6278EF]">
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="password" className="text-sm font-medium">
              Lösenord:
            </label>
            <div className="w-full border p-2 rounded border-[#6278EF]">
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                className="mr-2"
              />
              Kom ihåg mig
            </label>
            <Link
              to=""
              className="underline hover:underline-offset-4 font-bold"
            >
              Glömt lösenord?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-textColor bg-primaryColor font-Poppins font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Logga in
          </button>
          <div className="text-center mt-4">
            Har du inget konto?{" "}
            <Link
              to="/register"
              className="underline hover:underline-offset-4 font-bold"
            >
              Registrera dig här!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const LoginPage: React.FC = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = () => {
//     setChecked(!checked);
//     console.log("Checkbox state:", !checked);
//   };

//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   return (
//     <>
//       <h1 className="text-center mb-4 font-Poppins leading-12">Logga in</h1>
//       <div className="box-border md:box-content bg-gray shadow-md rounded-md p-8">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col space-y-3">
//             <label htmlFor="username" className="text-sm font-medium">
//               Användarnamn:
//             </label>
//           </div>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={handleUsernameChange}
//             className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <div className="flex flex-col items-center space-y-2">
//             <label htmlFor="password" className="text-sm font-medium">
//               Lösenord:
//             </label>
//           </div>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//             className="w-3/5 p-2 border border-buttonPurple rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <div className="flex justify-around">
//             <label className="">
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 onChange={handleChange}
//               />{" "}
//               Kom ihåg mig
//             </label>
//             <Link
//               to=""
//               className="underline hover:underline-offset-4 font-bold"
//             >
//               Glömt lösenord?
//             </Link>
//           </div>
//           <button
//             type="submit"
//             className="w-2/5 py-2 text-textColor bg-primaryColor font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             Logga in
//           </button>
//           <div className="">
//             Har du inget konto?{" "}
//             <Link
//               to="/register"
//               className="underline hover:underline-offset-4 font-bold"
//             >
//               Registrera dig här!
//             </Link>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default LoginPage;
