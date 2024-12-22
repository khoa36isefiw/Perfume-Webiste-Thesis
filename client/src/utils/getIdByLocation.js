export const getId = (location) => {
    const path = location.pathname;
    // removes the last element from an array and returns that element.
    const id = path.split('/').pop();
    return id;
};
