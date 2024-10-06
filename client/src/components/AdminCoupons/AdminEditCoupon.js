import React from 'react';
import { useLocation } from 'react-router-dom';

function AdminEditCoupon() {
    const location = useLocation();
    const { couponData } = location.state || {};
    console.log('couponData: ', couponData);
    return <div>AdminEditCoupon</div>;
}

export default AdminEditCoupon;
