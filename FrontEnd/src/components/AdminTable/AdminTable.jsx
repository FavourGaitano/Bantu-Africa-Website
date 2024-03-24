import React from 'react'
import './AdminTable.scss'

const AdminTable = () => {
  return (
    <div>AdminTable

        <body>
        <div class="cart">
        

            <table>
            <thead>
                <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td class="td-custom">1</td>
                <td>First Name</td>
                <td>Last Name</td>
                <td>Email</td>
                <td>Created At</td>
                
                <td>
                    <span><button class="action-btn">Delete</button></span>
                    &nbsp;
                    <span><button class ="action-btn0">Edit</button></span>
                </td>
                </tr>
            
            </tbody>
            </table>

           
           
        </div>
        </body>

    </div>
  )
}

export default AdminTable