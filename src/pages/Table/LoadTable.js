import React, { useState, useEffect } from 'react'
import XLSX from 'xlsx';

const workbook = XLSX.readFile('C:\Users\sneha\climate-risk\src\pages\Table\Data.xlsx');
const sheetName = workbook.SheetNames[0]; // get the first sheet name
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);
const DataTable = ({ selectedYear }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const filteredData = climateRiskData.filter(item => item.year === selectedYear)
    setData(filteredData)
  }, [selectedYear])

  return (
    <div>
      <h1>Climate Risk Data</h1>
      <table>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Lat</th>
            <th>Long</th>
            <th>Business Category</th>
            <th>Risk Rating</th>
            <th>Risk Factors</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.Asset_Name}</td>
              <td>{row.Lat}</td>
              <td>{row.Long}</td>
              <td>{row.Business_Category}</td>
              <td>{row.Risk_Rating}</td>
              <td>{row.Risk_Factors}</td>
              <td>{row.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable