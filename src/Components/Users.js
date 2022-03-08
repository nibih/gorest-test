import { setSortBy } from "../redux/sort";
import React from "react";
import "./Users.module.css";
import { deleteUser } from "../lib/utils";
import { useQueryClient, useMutation } from "react-query";

export function Users(props) {
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return (
    <table className="full">
      <thead>
        <tr>
          <td
            className="clickable"
            onClick={() => {
              props.dispatch(setSortBy("name"));
            }}
          >
            <div className="flex between">
              <p>Name</p>
              <span className="material-icons">expand_more</span>
            </div>
          </td>
          <td
            className="clickable"
            onClick={() => {
              props.dispatch(setSortBy("email"));
            }}
          >
            <div className="flex between">
              <p>Email</p>
              <span className="material-icons">expand_more</span>
            </div>
          </td>
          <td>Gender</td>
          <td>Status</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user) => {
          // display users in table
          return (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.status}</td>
              <td className="clickable">
                <div
                  className="material-icons center full"
                  onClick={() => {
                    deleteUserMutation.mutate(user.id);
                  }}
                >
                  delete
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
