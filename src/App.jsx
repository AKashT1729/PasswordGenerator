import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [passwordLength, SetPasswordLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialAllowed, setSpecialAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passewordGenerator = useCallback(() => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (numAllowed) str += "0123456789";

    if (specialAllowed) str += "!@#$%^&*()_+=-[]{}|;':\",.<>/?";

    if (typeof str !== "string" || str.length === 0) {
      throw new Error("The string is empty or not a string.");
    }

    for (let i = 1; i <= passwordLength; i++) {
      let randomChar = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomChar);
    }

    setPassword(pass);
  }, [password, passwordLength, numAllowed, specialAllowed, setPassword]);

  const copyPasseword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passewordGenerator();
  }, [passwordLength, numAllowed, specialAllowed]);

  return (
    <>
      <div className="container mx-auto p-4 text-white bg-red-700 rounded-2xl ">
        <div className="mb-4">
          <label className="block text-white">Input:</label>
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white">Range:</label>
          <input
            type="range"
            value={passwordLength}
            min="8"
            max="100"
            onChange={(e) => SetPasswordLength(e.target.value)}
            className="w-full corsor-pointer"
          />
          <span>{passwordLength}</span>
        </div>

        <div className="mb-4">
          <label className="block text-white">Options:</label>
          <div>
            <input
              type="checkbox"
              className="mr-2 "
              defaultValue={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label>Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              className="mr-2"
              defaultValue={specialAllowed}
              onChange={() => {
                setSpecialAllowed((prev) => !prev);
              }}
            />
            <label>Special Characters</label>
          </div>
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          onClick={copyPasseword}
        >
          Copy Text
        </button>
      </div>
    </>
  );
}

export default App;
