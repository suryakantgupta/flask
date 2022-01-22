import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import './Blog.scss'

const Blog = () => {
    const [state, setState] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        axios.get(`${baseUrl}/get-blog`)
            .then((response) => {
                setState(response.data)
            })
    }, []);
    const blog = state.filter((blog) => blog.id == id)

    console.log(blog[0])
    return (
        <div
            className="blog"
        >
            <div>
                {blog[0].title}
            </div>
            <div
                dangerouslySetInnerHTML={{
                    __html: blog[0].description
                }}
            />

        </div>
    )
};

export default Blog;
