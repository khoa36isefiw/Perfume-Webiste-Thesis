export const fadeInAnimation = {
    '@keyframes fadeIn': {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    },
    animation: 'fadeIn 2.5s ease-in-out',
};

export const scrollAppearingAnimation = {
    '@keyframes appear': {
        from: { opacity: 0, transform: 'translateY(100px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    },
    // apply animation
    animation: 'appear 5s linear',
    // happeans only when the particular element is visible on the screen
    animationTimeline: 'view()',
    animationRange: 'entry 30% cover 60%',
};
