import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CustomizeTypography } from '../CustomizeTypography/CustomizeTypography';
import CustomizeTitle from '../CustomizeTitle/CustomizeTitle';
import { groupCollection1, groupCollection2, groupCollection3 } from './collectionsData';
import { scrollAppearingAnimationV2 } from '../AnimationEffects/AnimationEffects';

function OurCollections() {
    const [isMobile, setIsMobile] = useState(false);

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
    return (
        <Container>
            <CustomizeTitle heading={'Our Collections'} />
            <Grid
                container
                spacing={4}
                sx={
                    {
                        // ...scrollAppearingAnimationV2
                    }
                }
            >
                {groupCollection1.map((collection, index) => (
                    <ImageGridItem
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
                    // ...scrollAppearingAnimationV2
                }}
            >
                {groupCollection2.map((collection, index) => (
                    <ImageGridItem
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
                    // ...scrollAppearingAnimationV2
                }}
            >
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
        <Grid item sm={gridSize} md={gridSize} lg={gridSize} sx={{ width: '100%' }}>
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
