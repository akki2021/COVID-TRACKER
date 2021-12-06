import React from 'react'
import "./Table.css"

function Table({country,cases}) {
    return (
        <div className="table">
            
                <tr>
                    <td>
                        {country}
                    </td>
                    <td className="case">
                        <strong>
                        {cases}
                        </strong>
                    </td>
                </tr>
            
        </div>
    );
}

export default Table
