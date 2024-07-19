import { useState } from 'react';
import Layout from '../components/Layout';

const QuotationPage = () => {
  const [price, setPrice] = useState('');
  const [warranty, setWarranty] = useState('');
  const [gps, setGps] = useState(false);
  const [adminExpenses, setAdminExpenses] = useState('default');
  const [customAdminExpense, setCustomAdminExpense] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('none');
  const [customInterestRate, setCustomInterestRate] = useState('');
  const [financingTerm, setFinancingTerm] = useState('6');

  // Vehicle Information States
  const [model, setModel] = useState('');
  const [subModel, setSubModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');

  // Define options for select fields
  const warrantyOptions = [
    { value: '0', label: 'No Warranty' },
    { value: '1200', label: '1 Year Warranty' },
    { value: '1695', label: '2 Years Warranty' },
  ];
  const adminExpenseOptions = [
    { value: 'default', label: 'Default ($1425)' },
    { value: 'other', label: 'Other' },
  ];
  const interestRateOptions = [
    { value: 'none', label: 'None' },
    { value: '22.9', label: '22.9%' },
    { value: 'other', label: 'Other' },
  ];
  const financingTermOptions = [
    { value: '6', label: '6 Months' },
    { value: '12', label: '12 Months' },
    { value: '18', label: '18 Months' },
    { value: '24', label: '24 Months' },
    { value: '30', label: '30 Months' },
    { value: '36', label: '36 Months' },
    { value: '42', label: '42 Months' },
    { value: '48', label: '48 Months' },
    { value: '54', label: '54 Months' },
    { value: '60', label: '60 Months' },
  ];

  // Calculations
  const priceValue = parseFloat(price) || 0;
  const warrantyValue = parseFloat(warranty) || 0;
  const gpsPrice = gps ? 595 : 0;
  const subtotal = priceValue + warrantyValue + gpsPrice;
  const gst = subtotal * 0.05;
  const qst = subtotal * 0.09975;
  const totalWithTaxes = subtotal + gst + qst;
  const adminExpense = adminExpenses === 'other' ? parseFloat(customAdminExpense) || 0 : 1425;
  const totalWithAdminExpenses = totalWithTaxes + adminExpense;
  const downPaymentAmount = parseFloat(downPayment) || 0;
  const thirdSubtotal = totalWithAdminExpenses - downPaymentAmount;

  const calculateMonthlyPayment = () => {
    if (!interestRate || !financingTerm) return 0;
    const rate = interestRate === 'other' ? parseFloat(customInterestRate) / 100 : parseFloat(interestRate) / 100;
    const termMonths = parseInt(financingTerm);
    if (isNaN(rate) || isNaN(termMonths) || termMonths <= 0) return 0;
    const monthlyRate = rate / 12;
    return (thirdSubtotal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
    if (e.target.value !== 'other') setCustomInterestRate('');
  };

  const handleAdminExpenseChange = (e) => {
    setAdminExpenses(e.target.value);
    if (e.target.value !== 'other') setCustomAdminExpense('');
  };

  const monthlyPayment = calculateMonthlyPayment();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Quotation Form</h1>
          <form>
            {/* Vehicle Information Section */}
            <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Vehicle Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-600">Model</label>
                  <input
                    id="model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="subModel" className="block text-sm font-medium text-gray-600">Submodel</label>
                  <input
                    id="subModel"
                    type="text"
                    value={subModel}
                    onChange={(e) => setSubModel(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-600">Year</label>
                  <input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-600">VIN</label>
                  <input
                    id="vin"
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-300 mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">Financial Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-600">Price</label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="warranty" className="block text-sm font-medium text-gray-600">Warranty</label>
                  <select
                    id="warranty"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                  >
                    {warrantyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="gps" className="block text-sm font-medium text-gray-600">GPS</label>
                  <input
                    id="gps"
                    type="checkbox"
                    checked={gps}
                    onChange={(e) => setGps(e.target.checked)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="adminExpenses" className="block text-sm font-medium text-gray-600">Administrative Expenses</label>
                  <select
                    id="adminExpenses"
                    value={adminExpenses}
                    onChange={handleAdminExpenseChange}
                    className="mt-1 block w-full border border-red-300 rounded-md shadow-sm text-black"
                  >
                    {adminExpenseOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {adminExpenses === 'other' && (
                    <input
                      type="number"
                      value={customAdminExpense}
                      onChange={(e) => setCustomAdminExpense(e.target.value)}
                      className="mt-2 block w-full border border-red-300 rounded-md shadow-sm"
                      placeholder="Specify amount"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-600">Down Payment</label>
                  <input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="interestRate" className="block text-sm font-medium text-gray-600">Interest Rate</label>
                  <select
                    id="interestRate"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    className="mt-1 block w-full border border-red-300 rounded-md shadow-sm text-black"
                  >
                    {interestRateOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {interestRate === 'other' && (
                    <input
                      type="number"
                      value={customInterestRate}
                      onChange={(e) => setCustomInterestRate(e.target.value)}
                      className="mt-2 block w-full border border-red-300 rounded-md shadow-sm"
                      placeholder="Specify rate"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="financingTerm" className="block text-sm font-medium text-gray-600">Financing Term</label>
                  <select
                    id="financingTerm"
                    value={financingTerm}
                    onChange={(e) => setFinancingTerm(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black"
                  >
                    {financingTermOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-gray-200 p-6 rounded-lg border border-gray-400 mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-100 rounded-lg">
                  <p className="font-medium text-gray-700">Subtotal:</p>
                  <p className="text-lg font-bold text-gray-900">${subtotal.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">GST (5%):</p>
                  <p className="text-lg font-bold text-gray-900">${gst.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">QST (9.975%):</p>
                  <p className="text-lg font-bold text-gray-900">${qst.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">Total with Taxes:</p>
                  <p className="text-lg font-bold text-gray-900">${totalWithTaxes.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">Administrative Expenses:</p>
                  <p className="text-lg font-bold text-gray-900">${adminExpense.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">Total with Admin Expenses:</p>
                  <p className="text-lg font-bold text-gray-900">${totalWithAdminExpenses.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">Down Payment:</p>
                  <p className="text-lg font-bold text-gray-900">${downPaymentAmount.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">Subtotal after Down Payment:</p>
                  <p className="text-lg font-bold text-gray-900">${thirdSubtotal.toFixed(2)}</p>
                  <p className="font-medium text-gray-700">Monthly Payment:</p>
                  <p className="text-lg font-bold text-gray-900">${monthlyPayment.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default QuotationPage;
