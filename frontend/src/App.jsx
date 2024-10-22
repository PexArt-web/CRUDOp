import { useEffect, useState } from "react";
import { connectSocket, socket } from "./services/weBSocket";
import Input from "./components/Input";

function App() {
  const [formData, setFromData] = useState([]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    let objData = { [name]: value };
    setFromData((prevState) => ({
      ...prevState,
      ...objData,
    }));
  };
  useEffect(() => {
    connectSocket();
  }, []);
  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    socket.emit("formdata", formData);
  };

  return (
    <div className="crud-container">
      <h1>CRUD OPERATION</h1>

      <Input
        name="name"
        placeholder={"Enter Your Name"}
        handleInput={handleInput}
      />
      <Input
        name="age"
        placeholder={"Enter Your Age"}
        handleInput={handleInput}
      />
      <Input
        name="phone"
        placeholder={"Enter Your Phone"}
        handleInput={handleInput}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
