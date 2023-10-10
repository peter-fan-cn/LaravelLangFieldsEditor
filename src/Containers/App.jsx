import { useState } from "react";
import reactLogo from "../assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <a href="/hello">show hello world</a>
    </div>
  );
}

export default App;
