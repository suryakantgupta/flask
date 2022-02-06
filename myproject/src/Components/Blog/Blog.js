import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl } from '../../baseUrl';
import './Blog.scss'
import { Rating } from '@mui/material';

const Blog = (props) => {
    const [state, setState] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        fetchBlog()
    }, []);

    const fetchBlog = () => {
        axios.get(`${baseUrl}/get-blog`)
            .then((response) => {
                setState(response.data)
            })
    }

    const blog = state.filter((blog) => blog._id.$oid == id)

    const [comment, setComment] = useState();
    const [value, setValue] = useState(2);

    const history = useNavigate()

    const handleCommentSubmit = () => {
        if (localStorage.getItem('token')) {
            let fd = new FormData()

            fd.append('firstName', localStorage.getItem('firstName'))
            fd.append('comment', comment)
            fd.append('id', id)

            axios.post(`${baseUrl}/post-comment`, fd, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    fetchBlog()
                })
        } else {
            history('/login')
        }
    }

    const handleRatingSubmit = (val) => {
        if (localStorage.getItem('token')) {
            let fd = new FormData()

            fd.append('id', id)

            fd.append('rating', val)

            axios.post(`${baseUrl}/post-rating`, fd, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    fetchBlog()
                })
        } else {
            history('/login')
        }
    }
    return (
        <div
            className="blog"
        >
            <div
                style={{
                    width: '100%'
                }}
            >
                {blog[0] && (
                    <>
                        <div
                            style={{
                                display: 'flex'
                            }}
                        >
                            Average Rating

                            {/* 
                            Component code used from Material UI
                            https://mui.com/components/rating/#main-content
                             */}

                            <Rating
                                className="post_rating"
                                value={blog[0].average_rating}
                                readOnly
                            />
                        </div>
                        <div
                            className="blog-body-container"
                        >
                            <div className='post_title'
                                style={{
                                    fontWeight: '700',
                                    fontSize: '30px',
                                    position: 'relative'
                                }}
                            >
                                {blog[0].title}
                                <img
                                    style={{
                                        position: 'absolute',
                                        top: '100px',
                                        right: '100px'
                                    }}
                                    src={blog[0].image}
                                    width="600"
                                    height="300"
                                />
                            </div>
                            <div className='detailed_description'
                                style={{
                                    textAlign: 'left'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: blog[0].description
                                }}
                            />
                        </div>
                    </>
                )}
            </div>

            <div
                className="post-comment-container"
            >
                <div>
                    <textarea
                        style={{
                            height: '80px',
                            width: '200px',
                            border: '1px solid lughtgray'
                        }}
                        value={comment}
                        placeholder='Comment'
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Rating
                        className="post_rating"
                        style={{
                            marginLeft: '15px'
                        }}
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            handleRatingSubmit(newValue)
                        }}
                    />
                </div>

                <button
                    className="submit-btn"
                    onClick={handleCommentSubmit}
                >
                    Submit
                </button>
            </div>

            <div
                className="comment_text"
                id="comment_text"
            >
                {blog[0]?.comment.map((data) => {
                    return (
                        <div
                            className="comment"
                        >
                            <div
                                className="comment-firstName"
                            >
                                {data.firstName}
                            </div>
                            <div
                                className="comment-body"
                            >
                                {data.comment}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};

export default Blog;
