import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

const ThrowPage = ({ current, onChange, total, productsPerPage }) => {
    const handlePageChange = (page) => {
        // Scroll to top of the page
        window.scrollTo(0, 0);
        // Call the onChange prop to update the current page
        onChange?.(page, productsPerPage);
    };

    return <Pagination current={current} onChange={handlePageChange} total={total} pageSize={productsPerPage} />;
};

ThrowPage.propTypes = {
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func,
    total: PropTypes.number.isRequired,
    productsPerPage: PropTypes.number.isRequired,
};

export default ThrowPage;
