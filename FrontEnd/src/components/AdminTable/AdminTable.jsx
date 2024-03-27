import React from "react";
import "./AdminTable.scss";

const AdminTable = ({
  tableNumber,
  thead1,
  thead2,
  thead3,
  thead4,
  tbody1,
  tbody2,
  tbody3,
  tbody4,
  tbody5,
}) => {
  return (
    <div>
      <div className="admin-table-body">
        <div className="admin-cart">
          <table>
            <thead>
              <tr>
                <th>{tableNumber}</th>
                <th>{thead1}</th>
                <th>{thead2}</th>
                <th>{thead3}</th>
                <th>{thead4}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="admin-td-custom">{tbody1}</td>
                <td>{tbody2}</td>
                <td>{tbody3}</td>
                <td>{tbody4}</td>
                <td>{tbody5}</td>

                <td>
                  <span>
                    <button className="action-btn">Delete</button>
                  </span>
                  &nbsp;
                  <span>
                    <button className="action-btn0">Edit</button>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
