// import React, { useState } from 'react';
// import Cards from 'react-credit-cards-2';
// import 'react-credit-cards-2/dist/es/styles-compiled.css';
// import './creditCard.css';

// const CreditCard = () => {
//     const [number, setNumber] = useState('');
//     const [expiry, setExpiry] = useState('');
//     const [cvc, setCvc] = useState('');
//     const [name, setName] = useState('');
//     const [focus, setFocus] = useState('');

//     return (
//         <div>
//             <Cards number={number} expiry={expiry} cvc={cvc} name={name} focused={focus} />
//             <form>
//                 <input
//                     type="tel"
//                     name="number"
//                     placeholder="Card Number"
//                     value={number}
//                     onChange={(e) => setNumber(e.target.value)}
//                     onFocus={(e) => setFocus(e.target.name)}
//                 />
//                 <input
//                     type="number"
//                     name="expiry"
//                     placeholder="MM/YY Expiry"
//                     value={expiry}
//                     onChange={(e) => setExpiry(e.target.value)}
//                     onFocus={(e) => setFocus(e.target.name)}
//                 />
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     onFocus={(e) => setFocus(e.target.name)}
//                 />
//                 <input
//                     type="tel"
//                     name="cvc"
//                     placeholder="CVC"
//                     value={cvc}
//                     onChange={(e) => setCvc(e.target.value)}
//                     onFocus={(e) => setFocus(e.target.name)}
//                 />
//             </form>
//         </div>
//     );
// };

// export default CreditCard;

import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Box, Grid, TextField, Container } from '@mui/material';
import { CustomizeTextFieldCreditCard } from '../TextFieldCustomize/TextFieldCustomize';
import './creditCard.css';

const CreditCard = () => {
    const [number, setNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [name, setName] = useState('');
    const [focus, setFocus] = useState('');

    return (
        <Container maxWidth="sm" sx={{ my: 4, bgcolor: '#555', borderRadius: '8px', p: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Cards number={number} expiry={expiry} cvc={cvc} name={name} focused={focus} />
            </Box>
            <Box component="form">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CustomizeTextFieldCreditCard
                            fullWidth
                            type="tel"
                            name="number"
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            onFocus={(e) => setFocus(e.target.name)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomizeTextFieldCreditCard
                            fullWidth
                            type="text"
                            name="name"
                            label="Name on Card"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => setFocus(e.target.name)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomizeTextFieldCreditCard
                            fullWidth
                            type="tel"
                            name="expiry"
                            label="Expiry Date"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            onFocus={(e) => setFocus(e.target.name)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomizeTextFieldCreditCard
                            fullWidth
                            type="tel"
                            name="cvc"
                            label="CVC"
                            placeholder="123"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            onFocus={(e) => setFocus(e.target.name)}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default CreditCard;
