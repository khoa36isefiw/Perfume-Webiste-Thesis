export const columns = [
    { id: 'avatar', label: 'Avatar', minWidth: 50 },
    { id: `name`, label: 'Name', minWidth: 70 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'left',
    },

    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'left',
        format: (value) => `${value.street}, ${value.city}`,
    },
    {
        id: 'phoneNumber',
        label: 'Phone',
        minWidth: 70,
        align: 'left',
    },
    { id: 'actions', label: 'Actions', minWidth: 170, align: 'center' }, // New column for actions
];
