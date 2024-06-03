import React from "react";
import GenaralNav from "../components/GeneralNav";

function User() {
  return (
    <div>
      <GenaralNav />
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* You can map through your data here to generate rows */}
          <tr>
            <td>John Doe</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default User;
