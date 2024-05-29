import React from 'react';
import './Voucher.css';

function VoucherAdd() {
    return (
        <div className="voucher-form">
            <h2>Create New Voucher</h2>
            <form>
                <label htmlFor="code">Voucher Code</label>
                <input type="text" id="code" name="code" required />

                <label htmlFor="discount">Discount (%)</label>
                <input type="number" id="discount" name="discount" required />

                <label htmlFor="mindiscount">Min Discount</label>
                <input type="number" id="mindiscount" name="mindiscount" required />

                <label htmlFor="maxdiscount">Max Discount</label>
                <input type="number" id="maxdiscount" name="maxdiscount" required />

                <label htmlFor="expiry">Expiry Date</label>
                <input type="date" id="expiry" name="expiry" required />

                <button type="submit" className='btn btn-success'>Create Voucher</button>
            </form>
        </div>
    );
};

export default VoucherAdd;
