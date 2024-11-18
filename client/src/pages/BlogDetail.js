import React from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { blogContent } from '../components/BlogsList/blogContent';
import { useTranslation } from 'react-i18next';

function BlogDetail() {
    const location = useLocation();
    // const { blog } = location.state || {}; // get blog's data from the state
    const blogDataSaved = JSON.parse(window.localStorage.getItem('blog_detail_data'));
    console.log('blogDataSaved: ', blogDataSaved);
    const { t } = useTranslation('translate');
    // const blogContent = blogContent(t);
    const getBlogContent = blogContent(t);

    // return <Box>{blogContent[blogDataSaved.blogId](t)}</Box>;
    return <Box>{getBlogContent[blogDataSaved.blogId]}</Box>;
}

export default BlogDetail;
