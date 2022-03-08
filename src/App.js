import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { propComparator, fetchUsers } from "./lib/utils";
import { Users } from "./Components/Users.js";
import { useQuery } from "react-query";
import { useState } from "react";
import { AddUser } from "./Components/AddUser";

function App() {
  const [AddUserVisible, setAddUserVisible] = useState(false)

  const { data, error, isError, isLoading } = useQuery("users", fetchUsers);

  const { sortBy } = useSelector((state) => state.sort);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <div className="Nav">
        <h2>Users</h2>
        <button
          onClick={() => {
            setAddUserVisible(!AddUserVisible);
          }}
        >
          Add User
        </button>
      </div>
      {isError && <div>Error: {error.message}</div>}
      {isLoading && <div>Loading...</div>}
      {data && (
        <Users users={data.sort(propComparator(sortBy))} dispatch={dispatch} />
      )}
      {AddUserVisible && <AddUser AddUserVisible={AddUserVisible} setAddUserVisible={setAddUserVisible}/>}
    </div>
  );
}

export default App;
