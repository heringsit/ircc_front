import React, { useState, useEffect, useRef } from "react";
import '../css/main.css'
import { NativeSelect, Button, TextField } from '@material-ui/core'
import comm from '../common';
import axios from 'axios';

export const Main = (props) => {
    const [project, setProject] = useState('');
    const [file, setFile] = useState(null);
    const handleProjectChange = (event) => {
        setProject(event.target.value);
    };
    const [newProject, setNewProject] = useState('');

    const fileInput = useRef();

    const handleFileUpload = (event) => {
        // const fileInfo = event.target.files[0];
        console.log(" handleFileUpload ===>> ", event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const doUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        axios.post(comm.SERVER_URL + "/uploads", formData).then(res => {
            console.log(" res: ", res);
        }).catch(err => {
            console.log(" err: ", err);
        })
    }

    const addProject = () => {
        console.log(" uploading newProject ", newProject);
    }

    const doCancel = () =>{
        console.log(" do Cancle !!");
    }

    return (
        <div className='whole'>
            <h1 className='title'>Herings IRCC</h1>
            <div className='main'>
                <div className='projectSelect'>
                    <NativeSelect
                        className='optionValue'
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={project}
                        onChange={handleProjectChange}
                    >
                        <option value="" className='optionValue'>Project</option>
                        <option value={'HDT101'} className='optionValue'>HDT101</option>
                        <option value={'HDT202'} className='optionValue'>HDT202</option>
                        <option value={'HDT204'} className='optionValue'>HDT204</option>
                    </NativeSelect>
                    <p className='addProjectLabel'>* 프로젝트 추가</p>
                    <div className="addProjectArea">
                        <TextField
                            id="addProject"
                            label="Project Name"
                            onChange={(event) => {
                                console.log(" text => ", event.target.value);
                                setNewProject(event.target.value)
                            }}
                        />
                        <Button variant='outlined' style={{marginTop:10, marginLeft:15}} onClick={addProject}>
                          추가  
                        </Button>

                    </div>

                </div>
                <div className='searchFile'>
                    <Button
                        variant="contained"
                        component="label"
                        // primary={false}
                        // label="Upload File"
                        onClick={() => {
                            console.log("file => ", fileInput.current);

                        }}
                    >File to Upload
                    <input
                            id="fileUp"
                            ref={fileInput}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            type="file"
                            onChange={(event) => handleFileUpload(event)}
                            hidden
                        // multiple  //하나여만 함 => 1 project 1 crf-file
                        />
                    </Button>
                    <div className='showFiles'>
                        {file? file.name : "No files yet"}
                    </div>
                </div>

            </div>

            <div className='addProject'>

            </div>
            <div className='buttonArea'>
                <Button
                    style={{marginRight:20}}
                    variant="contained"
                    component="label"
                    // primary={false}
                    // label="Upload File"
                    onClick={doUpload}>Upload</Button>
                <Button
                    variant="contained"
                    component="label"
                    // primary={false}
                    // label="Upload File"
                    onClick={doCancel}>Cancel</Button>
            </div>
        </div>
    )
}
