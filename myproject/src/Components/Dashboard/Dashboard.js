import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import './Dashboard.scss';

const Dashboard = () => {
  const [state, setState] = useState([]);

  const history = useNavigate()

  useEffect(() => {
    axios.get(`${baseUrl}/get-blog`)
      .then((response) => {
        setState(response.data)
      })
  }, []);

  return (
    <div
      className="dashboard"
    >
      {state.map((blog) => (
        <div
          className="blog-card"
          onClick={() => history(`/blog/${blog.id}`)}
        >
          {blog.title}
        </div>
      ))}
    </div>
  )
};

export default Dashboard;
