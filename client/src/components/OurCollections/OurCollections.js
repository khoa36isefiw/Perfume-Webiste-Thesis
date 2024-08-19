import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import { theme } from '../../Theme/Theme';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { groupCollection1, groupCollection2, groupCollection3 } from './collectionsData';

function OurCollections() {
    return (
        <Container>
            <CustomizeTitle heading={'Our Collections'} />
            <Grid container spacing={4}>
                {groupCollection1.map((collection, index) => (
                    <ImageGridItem
                        key={index}
                        collection={collection}
                        gridSize={index === 0 ? 4 : 8}
                    />
                ))}
            </Grid>
            <Grid container spacing={4} sx={{ mt: 1 }}>
                {groupCollection2.map((collection, index) => (
                    <ImageGridItem
                        key={index}
                        collection={collection}
                        gridSize={index === 0 ? 6 : 6}
                    />
                ))}
            </Grid>
            <Grid container spacing={4} sx={{ mt: 1 }}>
                {groupCollection3.map((collection, index) => (
                    <ImageGridItem key={index} collection={collection} gridSize={4} />
                ))}
            </Grid>
        </Container>
    );
}

export default OurCollections;

function ImageGridItem({ collection, gridSize }) {
    return (
        <Grid item lg={gridSize}>
            <Box
                sx={{
                    backgroundImage: `url(${collection.collectionImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '500px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-end',
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
