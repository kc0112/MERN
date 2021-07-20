import React,{useState,useEffect,useContext} from 'react'
import {AuthContext} from '../context/AuthProvider'
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';

function Signup() {
    const [email,setEmail] =useState('');
    const[password,setPassword] = useState('');
    const [name,setName] =useState('');
    // const[error,setError] = useState('');
    const[loading,setLoading] = useState(false);
    // const history = useHistory();
    // const [file,setFile] = useState(null)
    const { signup, currentUser } = useContext(AuthContext);
    
    const handleSignup = async (e) => {
        // prevents default action of button
        e.preventDefault();
        // loader chlega, signup,uid lelenge for future use
        setLoading(true);
        let res = await signup(email, password);
        let uid = res.user.uid;
        console.log(uid); 
    }

    const paperStyle={padding :20,width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle = { margin: '40px 0 0 0' }
    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign Up</h2>
            </Grid>
        <form onSubmit={handleSignup} >
            <TextField label='username' placeholder='Enter username' type="text" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
            <TextField label='email' placeholder='Enter email' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} fullWidth required  />
            <TextField label='password' placeholder='Enter password' type="password" value={password} onChange={(e) =>setPassword(e.target.value)}  fullWidth required />
            <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth disabled={loading}>SignUp</Button>
        </form>
        </Paper>
     </Grid>
    )
}

export default Signup




