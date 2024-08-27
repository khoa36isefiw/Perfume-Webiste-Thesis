import { Box } from '@mui/material';
export const SelectAddress = ({ select, listProvince, setSelectedProvince, selectedProvince }) => {
    const handleProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setSelectedProvince(selectedProvince);
    };

    return (
        <Box sx={{ mt: 2 }}>
            <div style={{ marginBottom: 10 }}>
                {/* get month from dropdown */}
                <Box sx={{ display: 'flex' }}>
                    <select
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        style={{
                            borderRadius: 5,
                            padding: '5px 10px',
                            // backgroundColor: '#FAFAFA',
                            border: '1px solid #ccc',
                            marginRight: 10,
                            width: '100%',
                        }}
                    >
                        <option value="Month">{select}</option>
                        {listProvince.map((province) => (
                            <option key={province.province_id} value={province.province_id}>
                                {province.province_name}
                            </option>
                        ))}
                    </select>
                </Box>
            </div>
        </Box>
    );
};
