import React, { useEffect, useState } from 'react';
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';
import { baseUrl } from '../../baseUrl';
import { useNavigate } from 'react-router-dom';

const PostBlog = () => {
    const history = useNavigate()
    console.log(localStorage.getItem('token'))

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            history('/login')
        }
    }, [localStorage.getItem('token')]);

    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [convertedContent, setConvertedContent] = useState(null);
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    };
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    };
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html)
        };
    };

    const handleSubmit = () => {
        let fd = new FormData()

        fd.append('title', title)
        fd.append('description', DOMPurify.sanitize(convertedContent))

        axios.post(`${baseUrl}/post-blog`, fd, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    return (
        <div
            style={{
                padding: '50px'
            }}
        >
            <div
                style={{
                    marginBottom: '30px',
                    marginRight: '100px'
                }}
            >
                <label
                    htmlFor='title'
                >
                    Title
                </label>
                <input
                    style={{
                        width: '250px'
                    }}
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button
                    type='button'
                    onClick={handleSubmit}
                >
                    Save
                </button>
            </div>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
            />
            {/* <div
                className="preview"
                dangerouslySetInnerHTML={createMarkup(convertedContent)}
            ></div> */}
        </div>
    )
};

export default PostBlog;
