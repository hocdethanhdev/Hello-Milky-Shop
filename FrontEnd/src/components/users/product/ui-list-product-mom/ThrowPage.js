import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

interface ThrowPageProps {
    current: number;
    onChange: PaginationProps['onChange'];
    total: number;
    productsPerPage: number;
}

const ThrowPage: React.FC<ThrowPageProps> = ({ current, onChange, total, productsPerPage }) => {
    const handlePageChange = (page: number) => {
        // Scroll to top of the page
        window.scrollTo(0, 0);
        // Call the onChange prop to update the current page
        onChange?.(page, productsPerPage);
    };

    return <Pagination current={current} onChange={handlePageChange} total={total} pageSize={productsPerPage} />;
};

export default ThrowPage;
