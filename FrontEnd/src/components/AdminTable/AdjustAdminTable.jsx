import React from "react";
import "./AdminTable.scss";

const AdminTable = (headings, data) => {
  return (
    <div>
      <div className="admin-table-body">
        <div className="admin-cart">
          <table>
            <thead>
              <tr>
                {headings &&
                  headings.map((heading, index) => (
                    <th key={index}>{heading}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data && data.map((item, index) => <tr key={index}></tr>)}
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
