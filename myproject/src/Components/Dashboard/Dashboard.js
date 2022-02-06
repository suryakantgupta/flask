import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import './Dashboard.scss';
import { MenuItem, FormControl, Select } from "@mui/material";

const Dashboard = () => {
  const [state, setState] = useState([]);

  const history = useNavigate()

  useEffect(() => {
    axios.get(`${baseUrl}/get-blog`)
      .then((response) => {
        setState(response.data)
      })
  }, []);
  /*
  Code used from W3schools to make sorting logic
  https://www.w3schools.com/jsref/jsref_sort.asp
   */
  const handleASC = () => {
    let newState = [...state]
    newState.sort((a, b) => {
      return new Date(b.createdAt.$date) - new Date(a.createdAt.$date);
    });
    setState(newState)
  }
/*
  Code used from W3schools to make sorting logic
  https://www.w3schools.com/jsref/jsref_sort.asp
   */
  const handleDSC = () => {
    let newState = [...state]
    newState.sort((a, b) => {
      return new Date(a.createdAt.$date) - new Date(b.createdAt.$date);
    });
    setState(newState)
  }

  const [sortBy, setSortBy] = useState("Select");

  return (
    <div
      className="dashboard"
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-end'
        }}
      >
        {/* 
               Component code used from Material UI
              https://mui.com/api/form-control-label/#main-content
                             */}
        <FormControl
          variant="outlined"
        >
          {/* 
                            Component code used from Material UI
                            https://mui.com/components/selects/#main-content
                             */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {/* 
               Component code used from Material UI
              https://mui.com/api/menu-item/#main-content
                             */}
            <MenuItem
              value="Select"
            >
              <em>Select</em>
            </MenuItem>
            <MenuItem
              value="asc"
              disableRipple
              onClick={handleASC}
            >
              Date (ASC)
            </MenuItem>
            <MenuItem
              value="dsc"
              disableRipple
              onClick={handleDSC}
            >
              Date (DSC)
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div
        className="blog_post"
        id="blog_post"
      >
        {state.map((blog) => (
          <div
            className="blog-card"
            onClick={() => history(`/blog/${blog._id.$oid}`)}
          >
            <img
              src={blog.image}
              height="150"
              width="300"
            />
            <h1
              className="post_title"
              id="post_title"
            >
              {blog.title}
            </h1>
            <p
              className="short_description"
              id="short_description"
              dangerouslySetInnerHTML={{
                __html: blog.description
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
};

export default Dashboard;
