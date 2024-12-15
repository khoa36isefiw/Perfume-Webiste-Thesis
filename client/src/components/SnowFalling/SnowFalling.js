import Snowfall from 'react-snowfall';

const SnowFalling = () => {
    return (
        <Snowfall
            snowflakeCount={100}
            style={{
                zIndex: 22,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default SnowFalling;
