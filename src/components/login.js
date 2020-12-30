import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

const Login = (props) => {
    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    
    const handleChangeId = (e) => {
        const {id, value} = e.target;
        setId(value);
    }

    const handleChangePass = (e) => {
        const {id, value} = e.target;
        setPass(value);
    }

    const handleSubmit = (e) => {
        console.log("submit => ", id);
        console.log("submit => ", pass);
        console.log(" props >>> ", props);
        props.history.push({
            pathname:'/main',
            state:id,
        })
        e.preventDefault();
    }

    return(
        <div style={{display:'flex', height:'600px', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
           
            <div style={{width:350, fontSize:38, textAlign:'center'}}>Herings IRCC</div>
            <form style={{textAlign:'left', marginLeft:50}} onSubmit={handleSubmit}>
                <div style={{marginTop:35}}>* ID </div>      
                <input style={{marginTop:4}} type="text" value={id} onChange={handleChangeId} />
          
                <div style={{marginTop:15}}>* PASSWORD </div>     
                <input style={{marginTop:4}} type='password' value={pass} onChange={handleChangePass} />
                <input style ={{marginLeft:20}} type="submit" value="LOG IN"/>
            </form>
        </div>
    )
}

export default withRouter(Login);
