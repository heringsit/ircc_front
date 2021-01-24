import React, { useState, useEffect, useRef } from "react";
import '../css/main.css'
import { NativeSelect, Button, TextField, Snackbar} from '@material-ui/core'
// import { Alert, AlertTitle } from '@material-ui/lab';

import comm from '../common';
import axios from 'axios';

export const Main = (props) => {
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState("Project");
    const [newProject, setNewProject] = useState('');
    const [file, setFile] = useState(null);
    const [alertError, setAlertError] = useState(false);
    const projectNameInput = useRef();

    const handleProjectChange = (event) => {
        console.log(" event.target.value >> ", event.target.value);
        if(event.target.value){
            setSelectedProject(event.target.value);
        }else{
            setSelectedProject("Project");
        }
    };

    const fileInput = useRef();

    useEffect(() => {
        axios.get(comm.SERVER_URL + "/schema").then(res => {
            console.log(" get schema res >> ", res.data.rows);
            setProject(res.data.rows);
        });
    }, [])

    const handleFileUpload = (event) => {
        // const fileInfo = event.target.files[0];
        console.log(" handleFileUpload ===>> ", event.target.files[0]);
        setFile(event.target.files[0]);
    };

    const doUpload = () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('project', selectedProject);

        axios.post(comm.SERVER_URL + "/uploads", formData).then(res => {
            console.log(" res: ", res);
        }).catch(err => {
            console.log(" err: ", err);
        })
    }

    const addProject = () => {
        console.log(" add Project ", newProject);
        let isAlreadyExist = false;

        project.forEach(each => {
            if (each.schema_name.toLowerCase() === newProject.toLowerCase()) {
                isAlreadyExist = true;
            }
        })

        if (newProject && !isAlreadyExist) {
            axios.post(comm.SERVER_URL + "/schema", { project: newProject }).then(res => {
                console.log(" add project res: ", res);
                setProject(res.data.rows);
            }).catch(err => {
                console.log(" err: ", err);
            })
        } else {
            console.log("Blank Project is not allowed !");
            setAlertError(true);
        }
        setNewProject('');
        console.log(" current >>> ", projectNameInput.current);
        projectNameInput.current.text='';
    }

    const doCancel = () => {
        console.log(" do Cancle !!");
    }

    const getProjectList = () => {
        return project.map(each => {
            return (
                <option value={each.schema_name} className='optionValue'>{each.schema_name}</option>
            )
        })
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
                        value={selectedProject}
                        onChange={handleProjectChange}
                    >
                        <option value="" className='optionValue'>Project</option>
                        {getProjectList()}
                        {/* <option value={'HDT101'} className='optionValue'>HDT101</option>
                        <option value={'HDT202'} className='optionValue'>HDT202</option>
                        <option value={'HDT204'} className='optionValue'>HDT204</option> */}
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
                            value={newProject}
                            inputRef={projectNameInput}
                        />
                        <Button variant='outlined' style={{ marginTop: 10, marginLeft: 15 }} onClick={addProject}>
                            추가
                        </Button>
                        <Snackbar message="이미 있는 프로젝트 이거나 프로젝트 이름이 비어 있습니다." 
                        anchorOrigin={{ vertical:'top', horizontal:'center' }}
                        open={alertError} 
                        autoHideDuration={2000} 
                        onClose={() => {setAlertError(false)}}/>
                        
                   
                    </div>

                </div>
                <div className='searchFile'>
                    <Button
                        disabled={selectedProject==="Project"? true : false}
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
                            onChange={(event) => {
                                
                                if(selectedProject === "Project"){
                                    return;
                                }
                                handleFileUpload(event)}}
                            hidden
                        // multiple  //하나여만 함 => 1 project 1 crf-file
                        />
                    </Button>
                    <div className='showFiles'>
                        {file ? file.name : "No files yet"}
                    </div>
                </div>

            </div>

            <div className='addProject'>

            </div>
            <div className='buttonArea'>
                <Button
                    style={{ marginRight: 20 }}
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
