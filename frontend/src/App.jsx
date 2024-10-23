import { useEffect, useState } from "react";
import { connectSocket, socket } from "./services/weBSocket";
import Input from "./components/Input";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [formData, setFormData] = useState({});
  const [crudData, setCrudData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const handleInput = (e) => {
    const { name, value } = e.target;
    let objData = { [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      ...objData,
    }));
  };
  useEffect(() => {
    connectSocket();
  }, []);

  useEffect(() => {
    socket.on("crudData", (data) => {
      setCrudData(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("formData", { ...formData, id: uuidv4() });
    socket.on("crudData", (data) => {
      setCrudData(data);
    });
    setFormData({
      name: "",
      age: "",
      phone: "",
    });
  };

  const editData = (data) => {
    setFormData(data);
    setIsEdit(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    socket.emit("editData", formData);
    setIsEdit(false);

    setFormData({
      name: "",
      age: "",
      phone: "",
    });
  };

  const handleDelte = (id) =>{
    socket.emit("deleteData", id)

  }

  return (
    <div className="crud-container">
      <h1>CRUD OPERATION</h1>

      <Input
        name="name"
        placeholder={"Enter Your Name"}
        handleInput={handleInput}
        value={formData.name || ""}
      />
      <Input
        name="age"
        placeholder={"Enter Your Age"}
        handleInput={handleInput}
        value={formData.age || ""}
      />
      <Input
        name="phone"
        placeholder={"Enter Your Phone"}
        handleInput={handleInput}
        value={formData.phone || ""}
      />

      <button onClick={isEdit ? handleEdit : handleSubmit}>
        {isEdit ? "Edit" : "Submit"}
      </button>

      <table>
        <tbody>
          <tr>
            <th>NAME</th>
            <th>AGE</th>
            <th>PHONE</th>
          </tr>
          {crudData.map((data) => (
            <tr key={data.phone}>
              <td>{data.name}</td>
              <td>{data.age}</td>
              <td>{data.phone}</td>
              <td>
                <button onClick={() => editData(data)}> Edit </button>
              </td>
              <td>
                <button onClick={()=>handleDelte(data?.id)}> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
