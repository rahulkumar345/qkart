import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link,Redirect } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
const history = useHistory();

  const handleInputChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputChangePassword = (e) => {
    setPassword(e.target.value);
  };
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  const formdata={
    username: Username,
    password: Password
  }
  const data={
    username: Username,
    password: Password
  }
  const login = async () => {
    let isValid=validateInput(formdata)
    setIsLoading(true);
    if(isValid){
      
    try{

     let res= await axios.post(`${config.endpoint}/auth/login`, data);
      
      console.log(res);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if(res.data.success===true){
        enqueueSnackbar('/logged in/i',{variant:'success'})
        setIsSuccessful(true);
        
       persistLogin(res.data.token,res.data.username,res.data.balance)
      //  window.location.reload()
        }
        setIsLoading(false);
  }
  


    catch(error){ 
      if (error.response) { 
        
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        enqueueSnackbar('Password is incorrect',{variant:'error'})
        setIsLoading(false);
      } else {
        // Something happened in setting up the request that triggered an Error
        enqueueSnackbar('Something went wrong. Check that the backend is running, reachable and returns valid JSON',{variant:'error'})
      }
    } 
    
  }else{
    setIsLoading(false);
    if(!formdata.username)
{
  enqueueSnackbar("Username is a required field")
}
if(!formdata.password)
{
  enqueueSnackbar("Password is a required field")
}


  } 
  };
  

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (formdata) => {
    if(!formdata.username||!formdata.password){
      return false
    }else{
      return true
    }
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('balance', balance);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        {isSuccessful?(<Redirect to="/" />):(
        <Stack spacing={2} className="form">
        <h2 className="title">Login</h2>
    
          <TextField
            id="username"
            label="username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
           onChange={handleInputChangeUsername}
          />
          <TextField
            id="password"
            variant="outlined"
            label="password"
            name="password"
            type="password"
            fullWidth
            onChange={handleInputChangePassword}
    
          />{isLoading?(
            <Box dispaly="flex" justifyContent="center" height={"auto"}>
            <CircularProgress color="success" />
            </Box>
          ):(
            <Button className="button" variant="contained" onClick={login}>
          LOGIN TO QKART
           </Button>)}
         
           <p className="secondary-action">
           Don’t have an account?{" "}
           <Link className="link" to="/Register">Register now</Link>

          </p>
          
        </Stack>
        )}
      </Box>
      <Footer />
     
    </Box>
  );
};

export default Login;
