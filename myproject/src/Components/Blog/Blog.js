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

    return (
        <div
            className="blog"
        >
            {blog[0] && (
                <>
                    <div>
                        {blog[0].title}
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: blog[0].description
                        }}
                    />
                </>
            )}
        </div>
    )
};

export default Blog;
