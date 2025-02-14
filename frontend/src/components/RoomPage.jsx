import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import "../App.css";

const RoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const [code, setCode] = useState("// Start coding here!");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [runResult, setRunResult] = useState("");
  const [language] = useState("javascript");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleLeaveRoom = () => {
    navigate("/create-join");
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const runCode = () => {
    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version: "*",
        files: [
          {
            name: `file.${language === "javascript" ? "js" : language}`,
            content: code,
          },
        ],
        stdin: "",
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_cpu_time: 10000,
        run_cpu_time: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.run && data.run.output) {
          setRunResult(data.run.output);
        }
      })
      .catch((error) => {
        console.error("Error executing code:", error);
        setRunResult("Error executing code");
      });
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="navLeft">
          <h1 className="title">Algo Arena</h1>
        </div>
        <div className="navCenter">
          <ul className="navLinks">
            <li className="navLink">Room: {roomId}</li>
          </ul>
        </div>
        <div className="navRight">
          <button onClick={handleLeaveRoom} className="leaveButton">
            Leave Room
          </button>
          <div className="userMenu">
            <div
              className="userIcon"
              onClick={toggleUserMenu}
              title="User Options"
            >
              👤 {username}
            </div>
            {userMenuOpen && (
              <div className="dropdownMenu">
                <div className="dropdownItem">Profile</div>
                <div className="dropdownItem" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div class="editorResultWrapper">
        <div className="editorContainer">
          <div class="editor-navbar">
            <span class="file-name">main.js</span>
            <button className="runButton" onClick={runCode}>
              Run
            </button>
          </div>
          <CodeMirror
            height="80vh"
            value={code}
            onChange={(val) => setCode(val)}
            extensions={[javascript()]}
            theme="dark"
          />
        </div>

        {/* <div className="runButtonContainer">
        <button className="runButton" onClick={runCode}>
          Run
        </button>
      </div> */}

        <div className="resultContainer">
          <div class="output-navbar">
            <span class="output-title">Output</span>
            <button class="btn clear">Clear</button>
          </div>
          <pre className="output">{runResult}</pre>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
