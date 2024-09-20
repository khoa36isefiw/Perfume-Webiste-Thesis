// import { Box } from '@mui/material';
// export const SelectAddress = ({
//     select,
//     listData,
//     type,
//     setSelectedProvince,
//     selectedProvince,
// }) => {
//     const handleProvinceChange = (event) => {
//         const selectedProvince = event.target.value;
//         setSelectedProvince(selectedProvince);
//     };

//     return (
//         <Box sx={{ mt: 2 }}>
//             <div style={{ marginBottom: 10 }}>
//                 {/* get month from dropdown */}
//                 <Box sx={{ display: 'flex' }}>
//                     <select
//                         value={selectedProvince}
//                         onChange={handleProvinceChange}
//                         style={{
//                             borderRadius: 5,
//                             padding: '5px 10px',
//                             // backgroundColor: '#FAFAFA',
//                             border: '1px solid #ccc',
//                             marginRight: 10,
//                             width: '100%',
//                         }}
//                     >
//                         <option>{select}</option>
//                         {listData.map((data) => (
//                             <option
//                                 key={
//                                     type === 'province'
//                                         ? data.province_id
//                                         : type === 'district'
//                                         ? data.district_id
//                                         : data.ward_id
//                                 }
//                                 value={
//                                     type === 'province'
//                                         ? data.province_id
//                                         : type === 'district'
//                                         ? data.district_id
//                                         : data.ward_id
//                                 }
//                             >
//                                 {type === 'province'
//                                     ? data.province_name
//                                     : type === 'district'
//                                     ? data.district_name
//                                     : data.ward_name}
//                             </option>
//                         ))}
//                     </select>
//                 </Box>
//             </div>
//         </Box>
//     );
// };

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SelectAddress({ select, listData, setSelectedProvince, type }) {
    const handleChooseLabel = (option) => {
        if (type === 'province') {
            return option.province_name;
        } else if (type === 'district') {
            return option.district_name;
        } else return option.ward_name;
    };
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={listData}
            getOptionLabel={(option) => handleChooseLabel(option)}
            // Trả về và cập nhật selectedProvince với province_id
            onChange={(event, newValue) => {
                if (newValue) {
                    if (type === 'province') {
                        // setSelectedProvince(newValue.province_id);
                        setSelectedProvince({
                            id: newValue.province_id,
                            name: newValue.province_name,
                        });
                    } else if (type === 'district') {
                        // setSelectedProvince(newValue.district_id);
                        setSelectedProvince({
                            id: newValue.district_id,
                            name: newValue.district_name,
                        });
                    } else {
                        // setSelectedProvince(newValue.ward_id);
                        setSelectedProvince({
                            id: newValue.ward_id,
                            name: newValue.ward_name,
                        });
                    }
                }
            }}
            fullWidth={true}
            sx={{ mb: 2 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={select}
                    sx={{
                        '.MuiFormLabel-root': {
                            color: '#fff',
                            fontSize: '14px',
                        },
                        '.MuiInputLabel-root': {
                            color: '#fff',
                        },
                        '.MuiInputBase-root': {
                            fontSize: '14px',
                            height: '50px',
                            color: 'white',
                            borderRadius: 1,
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: '12.5px',
                            color: 'red',
                            mx: 1,
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#333',
                            },
                            '&:hover fieldset': {
                                borderColor: '#333',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#333',
                            },
                        },
                    }}
                />
            )}
        />
    );
}
