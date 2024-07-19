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
      <div className="container mx-auto p-4 md:p-8 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold">Quotation</h1>
            <p className="mt-2 text-blue-100">Vehicle Purchase and Financing</p>
          </div>

          <form className="p-6 md:p-8 space-y-8">
            {/* Vehicle Information Section */}
            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vehicle Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    id="model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="subModel" className="block text-sm font-medium text-gray-700">Submodel</label>
                  <input
                    id="subModel"
                    type="text"
                    value={subModel}
                    onChange={(e) => setSubModel(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700">VIN</label>
                  <input
                    id="vin"
                    type="text"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </div>
            </section>

            {/* Financial Information Section */}
            <section className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h2 className="text-2xl font-semibold mb-4 text-red-700">Financial Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-2"
                  />
                </div>
                <div>
                  <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">Warranty</label>
                  <select
                    id="warranty"
                    value={warranty}
                    onChange={(e) => setWarranty(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  >
                    {warrantyOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label htmlFor="gps" className="flex items-center text-sm font-medium text-gray-700">
                    <input
                      id="gps"
                      type="checkbox"
                      checked={gps}
                      onChange={(e) => setGps(e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    GPS
                  </label>
                </div>
                <div>
                  <label htmlFor="adminExpenses" className="block text-sm font-medium text-gray-700">Administrative Expenses</label>
                  <select
                    id="adminExpenses"
                    value={adminExpenses}
                    onChange={handleAdminExpenseChange}
                    className="mt-1 block w-full border border-red-300 rounded-md shadow-sm p-2 text-black"
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
                      className="mt-2 block w-full border border-red-300 rounded-md shadow-sm p-2"
                      placeholder="Specify amount"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700">Down Payment</label>
                  <input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-black p-2"
                  />
                </div>
                <div>
                  <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Interest Rate</label>
                  <select
                    id="interestRate"
                    value={interestRate}
                    onChange={handleInterestRateChange}
                    className="mt-1 block w-full border border-red-300 rounded-md shadow-sm p-2 text-black"
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
                      className="mt-2 block w-full border border-red-300 rounded-md shadow-sm p-2"
                      placeholder="Specify rate"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="financingTerm" className="block text-sm font-medium text-gray-700">Financing Term</label>
                  <select
                    id="financingTerm"
                    value={financingTerm}
                    onChange={(e) => setFinancingTerm(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                  >
                    {financingTermOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Summary Section */}
            <section className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 text-black">
                  <SummaryItem label="Subtotal" value={subtotal} />
                  <SummaryItem label="GST (5%)" value={gst} />
                  <SummaryItem label="QST (9.975%)" value={qst} />
                  <SummaryItem label="Total with Taxes" value={totalWithTaxes} highlight />
                  <SummaryItem label="Administrative Expenses" value={adminExpense} />
                  <SummaryItem label="Total with Admin Expenses" value={totalWithAdminExpenses} highlight />
                </div>
                <div className="space-y-4 text-black">
                  <SummaryItem label="Down Payment" value={downPaymentAmount} />
                  <SummaryItem label="Subtotal after Down Payment" value={thirdSubtotal} highlight />
                  <SummaryItem label="Monthly Payment" value={monthlyPayment} highlight />
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button type="button" className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors">
                Save Draft
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Generate Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

// Helper component for summary items
const SummaryItem = ({ label, value, highlight = false }) => (
  <div className={`flex justify-between ${highlight ? 'font-bold' : ''}`}>
    <span>{label}:</span>
    <span>${typeof value === 'number' ? value.toFixed(2) : value}</span>
  </div>
);

export default QuotationPage;