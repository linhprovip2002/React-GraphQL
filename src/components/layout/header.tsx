import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '../../constants';

const Header = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="flex justify-between items-center p-4 bg-orange-500 w-[92rem] ">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white font-bold">
          Hacker News
        </Link>
        <div className="flex space-x-4"> {/* Container for "New" and "Search" links */}
          <Link to="/" className="text-white">
            New
          </Link>
         </div> 
         <div className="flex space-x-4"> 
         <div className="text-white">|</div>
          <Link to="/search" className="text-white">
            Search
          </Link>
        </div>
        {authToken && (
          <div className="flex justify-evenly w-[9.5em]">
            <div className="text-white">|</div>
            <Link to="/create" className="text-white">
              Create news link
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {authToken ? (
          <div
            className="text-white cursor-pointer"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              navigate(`/`);
            }}
          >
            Logout
          </div>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
