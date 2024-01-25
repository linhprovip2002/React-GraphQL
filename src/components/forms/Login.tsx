import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../../constants';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../../graphQL';
import { Store } from 'react-notifications-component';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem('currentUserId', login.user.id);
      console.log(login.user.id);
      navigate('/');
    }
  });
  
  const [signUp] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    }
  });

  const handleButtonClick = async () => {
    try {
      if (formState.login) {
        console.log('login');
        await login();
        Store.addNotification({
          title: "Login successfully!",
          message: "Welcome to Hackernews!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        navigate('/');
      } else {
        console.log('signup');
        await signUp();
        Store.addNotification({
          title: "Register successfully!",
          message: "Please login to use my website !",
          type: "info",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        navigate('/login');
        // set the formState to true
        setFormState({
          ...formState,
          login: true
        });
      }
      // Example navigation (replace with actual routing logic)

    } catch (error:any) {
      Store.addNotification({
        title: "Error! An error occurred. Please try again later",
        message: `${error.message}`,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-2xl">
      <h4 className="text-xl mb-3 flex justify-center">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-col space-y-3">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
            className="border p-2 rounded"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
          className="border p-2 rounded"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
          className="border p-2 rounded"
        />
      </div>
      <div className="flex mt-3 ">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
          onClick={handleButtonClick}
        >
          {formState.login ? 'Login' : 'Create Account'}
        </button>
        <button
          className="px-4 py-2 text-blue-500"
          onClick={() =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'Need to create an account?'
            : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;
