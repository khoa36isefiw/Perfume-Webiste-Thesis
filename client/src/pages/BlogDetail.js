import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { blogContent } from '../components/BlogsList/blogContent';

function BlogDetail() {
    const location = useLocation();
    const { blog } = location.state || {}; // get blog's data from the state
    const blogDataSaved = JSON.parse(window.localStorage.getItem('blog_detail_data'));
    console.log('blogDataSaved: ', blogDataSaved);

    return <Box>{blogContent[blogDataSaved.blogId]}</Box>;
}

export default BlogDetail;
