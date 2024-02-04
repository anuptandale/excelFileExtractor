'use client';
import Image from 'next/image'
import * as XLSX from "xlsx"
import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react'
interface type {
  id: string,
  links: string,
  prefix: string,
  "select tag":string,
}
interface tagtype {
  [id: string]: string[];
}
const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [data, setData] = useState<type[]>([]);
  const [tags, setTags] = useState<tagtype>({});
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    console.log(data)
  }, [data])
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);


  };
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>, id: any) => {
    const selectedValue = event.target.value;

    setTags((prevTags) => {
      const updatedTagsSet = new Set([...(prevTags[id] || [])]);

      // Add the selected value to the Set
      updatedTagsSet.add(selectedValue);

      return {
        ...prevTags,
        [id]: Array.from(updatedTagsSet), // Convert the Set back to an array
      };
    });
  };

  const handleCross = (v: string, id: string) => {
    console.log(v, " ", id)
    setTags((prevTags) => ({
      ...prevTags,
      [id]: (prevTags[id] || []).filter((value) => value !== v),
    }));
  };
  const handleRemove = () => {
    setSelectedFile(null);
  };
  const handleUpload = () => {
    setButtonClicked(true);
    const file = selectedFile;
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);

      reader.onload = (e) => {
        const data = e.target?.result as string; // Use optional chaining and type assertion
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData as never[]);
      };
    }

    console.log(selectedFile);
  }
  return (
    <div style={{ display: "flex", backgroundColor: "#F8FAFF" }}>
      <div className='dashboard'>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "35px" }}>
          <Image src="/Logo and company.png" alt="el" height={50} width={100} />
          <div style={{ display: "flex", gap: "10px" }}>
            <Image src="/dashboard.png" alt="el" height={25} width={25} style={{ opacity: "0.6" }} />
            Dashboard
          </div>
          <div style={{ display: "flex", gap: "10px", color: "blue" }} >
            <Image src="/upload.png" alt="el" height={25} width={25} style={{ color: "blue", opacity: "0.6" }} />
            Upload
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Image src="/invoice.png" alt="el" height={25} width={25} style={{ opacity: "0.6" }} />
            Invoice
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Image src="/calendar-lines.png" alt="el" height={25} width={25} style={{ opacity: "0.6" }} />
            Schedule
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Image src="/calendar.png" alt="el" height={25} width={25} style={{ opacity: "0.6" }} />
            Calendar
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Image src="/cowbell.png" alt="el" height={25} width={25} style={{ opacity: "0.6" }} />
            Notification
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Image src="/api.png" alt="el" height={25} width={25} style={{ opacity: "0.6" }} />
            Setting
          </div>
        </div>
      </div>
      <div >
        <div className="hello">
        <div className='csv'>
          <div style={{ fontWeight: "700", fontSize: "20px" }}>
            <Image src="/Logo and company.png" alt="el" height={50} width={100} />
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <Image src="/bell.png" alt="el" height={20} width={25} />
            <Image src="/Ashish-Jadhav.jpg" alt="el" height={28} width={25} style={{ borderRadius: "50px" }} />
          </div>
        </div>
        </div>
        <div className="mobilehello">
        <div className='csv'>
          <div style={{ fontWeight: "700", fontSize: "20px" }}>
            Upload CSV
          </div>
          <div style={{ display: "flex", gap: "30px" }}>
            <Image src="/bell.png" alt="el" height={20} width={25} />
            <Image src="/Ashish-Jadhav.jpg" alt="el" height={28} width={25} style={{ borderRadius: "50px" }} />
          </div>
        </div>
        </div>
        <div className='formContainer'>
          <div className='mobileboxfile' >
            <label htmlFor="inputTag">

              {!selectedFile && (<div className='drag' ><Image src="/xls.png" alt="el" height={48} width={55} />
                <span>Drop your excel sheet here or</span> <span style={{ color: "blue" }}>browse</span></div>)}
              {selectedFile && (
                <div className='drag' >
                  <Image src="/xls.png" alt="el" height={48} width={55} />
                  <p>Uploaded File: {selectedFile.name} </p>
                  <button type='button' onClick={handleRemove} style={{ color: "blue" }}>Remove</button>
                </div>
              )}
              <input id="inputTag" type="file" onChange={handleFileChange} />
            </label>
            <button type='submit' className='button' onClick={handleUpload} >Upload</button>
          </div>
        </div>
        {selectedFile && buttonClicked && <div className='mostouter'>
          <div style={{ marginBottom: "20px" }}>
            Uploads
          </div>
          <div style={{ backgroundColor: " rgb(243, 242, 242)", borderRadius: "8px" }}>
            <table style={{ padding: "15px", borderCollapse: 'separate', borderSpacing: '0 10px', width: "100%" }}>
              <thead>
                <tr>
                  <td>SI No.</td>
                  <td>Links</td>
                  <td>Prefix</td>
                  <td>Add Tags</td>
                  <td style={{ width: "50%" }}>Selected tags</td>
                </tr>
              </thead>

              <tbody className='field'>
                {data.map((row, index) => (

                  <tr key={index} style={{ borderRadius: '15px', height: "50px", backgroundColor: "white" }}>
                    <td>{row.id}</td>
                    <td><a target='_blank' style={{ color: "blue", textDecoration: "underline" }} href={row.links.startsWith('http') ? row.links : `http://${row.links}`}>{row.links}</a></td>
                    <td>{row.prefix}</td>
                    <td>
                      <select
                        name="select tags"
                        value={tags[row.id]?.length && ''} id="select tags"
                        onChange={(e) => handleSelectChange(e, row.id)}
                        style={{ border: "1px solid lightgrey", borderRadius: "5px", padding: "5px" }}
                      >
                        <option value="se" >Select Tags</option>
                        {row['select tags'].split(',').map(tag => tag.trim()).map((item, index) => {  
                          return <option key={index} value={item}>{item}</option>
                        })}
                      </select>
                    </td>
                    <td className='alltags' >{
                      tags[row.id]?.map((item, index) => {
                        return <div key={index} className='itemseach'>
                          <div>{item}</div>
                          <div onClick={() => handleCross(item, row.id)}><Image src="/close.png" alt="el" height={10} style={{ cursor: "pointer" }} width={10} /></div></div>
                      })
                    }</td>
                  </tr>

                ))}

              </tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Dashboard
