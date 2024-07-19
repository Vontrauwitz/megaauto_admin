import React from 'react';

const PrintableQuotation = React.forwardRef(({ data }, ref) => {
  return (
    <div ref={ref} className="p-8 max-w-4xl mx-auto bg-white">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Vehicle Quotation</h1>
        <p className="text-gray-500">Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Vehicle Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="font-semibold">Model:</span> {data.model}</div>
          <div><span className="font-semibold">Submodel:</span> {data.subModel}</div>
          <div><span className="font-semibold">Year:</span> {data.year}</div>
          <div><span className="font-semibold">VIN:</span> {data.vin}</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Financial Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="font-semibold">Price:</span> ${data.price}</div>
          <div><span className="font-semibold">Warranty:</span> ${data.warranty}</div>
          <div><span className="font-semibold">GPS:</span> {data.gps ? 'Yes' : 'No'}</div>
          <div><span className="font-semibold">Admin Expenses:</span> ${data.adminExpense}</div>
          <div><span className="font-semibold">Down Payment:</span> ${data.downPayment}</div>
          <div><span className="font-semibold">Interest Rate:</span> {data.interestRate}%</div>
          <div><span className="font-semibold">Financing Term:</span> {data.financingTerm} months</div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 border-b pb-2">Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><span className="font-semibold">Subtotal:</span> ${data.subtotal.toFixed(2)}</div>
          <div><span className="font-semibold">GST (5%):</span> ${data.gst.toFixed(2)}</div>
          <div><span className="font-semibold">QST (9.975%):</span> ${data.qst.toFixed(2)}</div>
          <div><span className="font-semibold">Total with Taxes:</span> ${data.totalWithTaxes.toFixed(2)}</div>
          <div><span className="font-semibold">Total with Admin Expenses:</span> ${data.totalWithAdminExpenses.toFixed(2)}</div>
          <div><span className="font-semibold">Subtotal after Down Payment:</span> ${data.thirdSubtotal.toFixed(2)}</div>
          <div className="col-span-2 text-xl font-bold mt-4">
            <span>Monthly Payment:</span> ${data.monthlyPayment.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-8">
        <p>This quotation is valid for 30 days from the date of issue. Terms and conditions apply.</p>
      </div>
    </div>
  );
});

PrintableQuotation.displayName = 'PrintableQuotation';

export default PrintableQuotation;