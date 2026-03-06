import React, { useState } from "react";

export default function FullPageLegalCalculator() {
  const [courtFee, setCourtFee] = useState("");
  const [stampDuty, setStampDuty] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [lawyerFee, setLawyerFee] = useState("");
  const [miscCharges, setMiscCharges] = useState("");
  const [total, setTotal] = useState(null);

  const calculateTotal = () => {
    const totalAmount =
      (parseFloat(courtFee) || 0) +
      (parseFloat(stampDuty) || 0) +
      (parseFloat(registrationFee) || 0) +
      (parseFloat(lawyerFee) || 0) +
      (parseFloat(miscCharges) || 0);
    setTotal(totalAmount.toFixed(2));
  };

  const resetCalculator = () => {
    setCourtFee("");
    setStampDuty("");
    setRegistrationFee("");
    setLawyerFee("");
    setMiscCharges("");
    setTotal(null);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-2"> Legal Cost Calculator</h1>
        <p className="text-blue-600 text-lg">
          Quickly calculate court fees, stamp duty, registration charges, lawyer fees, and more!
        </p>
      </header>

      {/* Main Calculator Box */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-blue-100">

        <div className="space-y-4">
          <input
            type="number"
            value={courtFee}
            onChange={(e) => setCourtFee(e.target.value)}
            placeholder="Court Fee (₹)"
            className="w-full p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="number"
            value={stampDuty}
            onChange={(e) => setStampDuty(e.target.value)}
            placeholder="Stamp Duty (₹)"
            className="w-full p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="number"
            value={registrationFee}
            onChange={(e) => setRegistrationFee(e.target.value)}
            placeholder="Registration Fee (₹)"
            className="w-full p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="number"
            value={lawyerFee}
            onChange={(e) => setLawyerFee(e.target.value)}
            placeholder="Lawyer Fee (₹)"
            className="w-full p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            type="number"
            value={miscCharges}
            onChange={(e) => setMiscCharges(e.target.value)}
            placeholder="Misc Charges (₹)"
            className="w-full p-3 rounded border border-blue-200 focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={calculateTotal}
            className="w-1/2 mr-2 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
          >
            Calculate
          </button>
          <button
            onClick={resetCalculator}
            className="w-1/2 ml-2 bg-gray-200 text-gray-700 font-bold py-2 rounded hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>

        {total !== null && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded text-center font-semibold text-lg">
            💰 Total Legal Cost: ₹ {total}
          </div>
        )}
      </div>
    </div>
  );
}
