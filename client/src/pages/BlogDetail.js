import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { blogContent } from '../components/BlogsList/blogContent';

function BlogDetail() {
    const location = useLocation();
    const { blog } = location.state || {}; // Lấy dữ liệu blog từ state

    return <Box>{blogContent[blog.blogId]}</Box>;
}

export default BlogDetail;
