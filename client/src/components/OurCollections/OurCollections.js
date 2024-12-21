import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { groupCollection1, groupCollection2, groupCollection3 } from './collectionsData';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { backTop } from '../goBackTop/goBackTop';

function OurCollections() {
    const [isMobile, setIsMobile] = useState(false);
    const { i18n } = useTranslation('translate');
    const location = useLocation();
    const navigate = useNavigate();

    function handleWindowSizeChange() {
        if (window.innerWidth < 739) {
            setIsMobile(true);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const handleSelectCollection = (brand) => {
        window.localStorage.setItem('filter', JSON.stringify(brand.destination));
        // get the current search query
        const currentQueryParams = new URLSearchParams(location.search);
        // remove the old brand and add new brand selected
        currentQueryParams.set('brand', brand.destination);
        console.log('currentQueryParams.toString(): ', currentQueryParams.toString());
        backTop();
        // update url
        navigate(`/${i18n.language}/shop?${currentQueryParams.toString()}`);
    };

    return (
        <Container>
            <CustomizeTitle heading={'Top Brands'} />
            <Grid container spacing={4}>
                {groupCollection1.map((collection, index) => (
                    <ImageGridItem
                        onHandleClick={() => handleSelectCollection(collection)}
                        key={index}
                        collection={collection}
                        gridSize={isMobile ? 12 : index === 0 ? 4 : 8}
                    />
                ))}
            </Grid>
            <Grid
                container
                spacing={4}
                sx={{
                    mt: 1,
                }}
            >
                {groupCollection2.map((collection, index) => (
                    <ImageGridItem
                        onHandleClick={() => handleSelectCollection(collection)}
                        key={index}
                        collection={collection}
                        gridSize={isMobile ? 12 : index === 0 ? 6 : 6}
                    />
                ))}
            </Grid>
            <Grid
                container
                spacing={4}
                sx={{
                    mt: 1,
                }}
            >
                {groupCollection3.map((collection, index) => (
                    <ImageGridItem
                        onHandleClick={() => handleSelectCollection(collection)}
                        key={index}
                        collection={collection}
                        gridSize={4}
                    />
                ))}
            </Grid>
        </Container>
    );
}

export default OurCollections;

function ImageGridItem({ collection, gridSize, onHandleClick }) {
    return (
        <Grid
            item
            sm={gridSize}
            md={gridSize}
            lg={gridSize}
            sx={{ width: '100%' }}
            onClick={onHandleClick}
        >
            <Box
                sx={{
                    backgroundImage: `url(${collection.collectionImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
                    '&:hover': {
                        cursor: 'pointer',
                        transform: 'translateY(-10px)',
                        borderRadius: 2,
                        filter: 'drop-shadow(0 0.4rem 1rem white)',
                    },
                    transition: '.5s ease',
                }}
            >
                <CustomizeTypography
                    sx={{
                        fontSize: '20px',
                        p: 2,
                    }}
                >
                    {collection.collectionName}
                </CustomizeTypography>
            </Box>
        </Grid>
    );
}
