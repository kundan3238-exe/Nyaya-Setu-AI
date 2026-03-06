import React, { useState, useEffect, useRef } from 'react';

const Firr = () => {
  // State for form data
  const [formData, setFormData] = useState({
    district: '',
    policeStation: '',
    firYear: new Date().getFullYear(),
    firNumber: '',
    firDate: new Date().toISOString().split('T')[0],
    act1: '',
    act2: '',
    act3: '',
    otherActs: '',
    occurrenceDay: '',
    occurrenceDate: '',
    occurrenceTime: '',
    infoReceivedDate: new Date().toISOString().split('T')[0],
    infoReceivedTime: '',
    gdEntry: '',
    gdTime: '',
    infoType: '',
    distanceFromPS: '',
    beatNumber: '',
    occurrenceAddress: '',
    outsidePS: '',
    complainantName: '',
    fatherHusbandName: '',
    complainantDOB: '',
    nationality: 'Indian',
    passportNumber: '',
    passportDate: '',
    passportPlace: '',
    occupation: '',
    complainantAddress: '',
    accusedDetails: '',
    delayReason: '',
    propertyDetails: '',
    propertyValue: '',
    briefFacts: '',
    actionTaken: '',
    investigatingOfficer: '',
    officerRank: ''
  });

  // State for UI controls
  const [showWatermark, setShowWatermark] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const formRef = useRef(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Auto-fill time received when occurrence time is filled
  useEffect(() => {
    if (formData.occurrenceTime && !formData.infoReceivedTime) {
      setFormData(prev => ({
        ...prev,
        infoReceivedTime: formData.occurrenceTime
      }));
    }
  }, [formData.occurrenceTime]);

  // Validate required fields
  const validateForm = () => {
    const requiredFields = [
      'district', 'policeStation', 'firYear', 'firDate', 'occurrenceDate',
      'occurrenceAddress', 'complainantName', 'fatherHusbandName', 
      'occupation', 'complainantAddress', 'briefFacts'
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field]);
    return emptyFields.length === 0;
  };

  // Reset form
  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset all form data?')) {
      setFormData({
        district: '',
        policeStation: '',
        firYear: new Date().getFullYear(),
        firNumber: '',
        firDate: new Date().toISOString().split('T')[0],
        act1: '',
        act2: '',
        act3: '',
        otherActs: '',
        occurrenceDay: '',
        occurrenceDate: '',
        occurrenceTime: '',
        infoReceivedDate: new Date().toISOString().split('T')[0],
        infoReceivedTime: '',
        gdEntry: '',
        gdTime: '',
        infoType: '',
        distanceFromPS: '',
        beatNumber: '',
        occurrenceAddress: '',
        outsidePS: '',
        complainantName: '',
        fatherHusbandName: '',
        complainantDOB: '',
        nationality: 'Indian',
        passportNumber: '',
        passportDate: '',
        passportPlace: '',
        occupation: '',
        complainantAddress: '',
        accusedDetails: '',
        delayReason: '',
        propertyDetails: '',
        propertyValue: '',
        briefFacts: '',
        actionTaken: '',
        investigatingOfficer: '',
        officerRank: ''
      });
    }
  };

  // Preview form
  const previewForm = () => {
    if (!validateForm()) {
      alert('Please fill all required fields marked with *');
      return;
    }
    
    setIsPreview(true);
    setTimeout(() => {
      if (window.confirm('Preview complete. Do you want to return to editing mode?')) {
        setIsPreview(false);
      }
    }, 2000);
  };

  // Download PDF (simulation - would need actual PDF library)
  const downloadPDF = () => {
    if (!validateForm()) {
      alert('Please fill all required fields marked with * before downloading PDF');
      return;
    }
    
    alert('PDF generation would require html2pdf.js library integration. Form data is valid and ready for PDF export.');
  };

  const inputClass = "w-full p-2 border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none text-sm";
  const labelClass = "block font-bold mb-1 text-gray-700 text-sm";
  const sectionTitleClass = "text-base font-bold mb-2 text-gray-700 border-b border-gray-300 pb-1";

  return (
    <div className="min-h-screen bg-gray-100 p-5 font-serif leading-normal">
      <div 
        ref={formRef}
        className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg relative"
      >
        {/* Watermark */}
        {showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="transform rotate-[-45deg] text-6xl text-gray-100 font-bold">
              NyayaSetu Legal Assistant
            </div>
          </div>
        )}

        {/* NyayaSetu Header */}
        {showHeader && (
          <div className="text-center text-gray-600 text-xs mb-5 p-2 bg-gray-50 rounded">
            <strong>Generated by NyayaSetu — Legal Assistant for Citizens</strong><br />
            <small>This form follows the official FORM IFI structure as per CrPC Section 154</small>
          </div>
        )}

        {/* Form Number */}
        <div className="absolute top-5 right-5 text-sm font-bold">
          Form No: IFI
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 border-b-2 border-gray-800 pb-4 relative z-20">
          <div className="text-2xl font-bold mb-1">FORM — IFI (INTEGRATED FORM)</div>
          <div className="text-lg font-bold mb-2">FIRST INFORMATION REPORT</div>
          <div>(Under Section 154 Cr.P.C.)</div>
        </div>


          {/* Police Station Information */}
          <div className="mb-6">
            <div className={sectionTitleClass}>POLICE STATION INFORMATION</div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="district" className={labelClass}>
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
              <div>
                <label htmlFor="policeStation" className={labelClass}>
                  Police Station <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="policeStation"
                  name="policeStation"
                  value={formData.policeStation}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="firYear" className={labelClass}>
                  FIR Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="firYear"
                  name="firYear"
                  value={formData.firYear}
                  onChange={handleInputChange}
                  min="2000"
                  max="2030"
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
              <div>
                <label htmlFor="firNumber" className={labelClass}>FIR Number</label>
                <input
                  type="text"
                  id="firNumber"
                  name="firNumber"
                  value={formData.firNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="firDate" className={labelClass}>
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="firDate"
                  name="firDate"
                  value={formData.firDate}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
            </div>
          </div>

          {/* Sections Applied */}
          <div className="mb-6">
            <div className={sectionTitleClass}>ACT & SECTIONS APPLIED</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="act1" className={labelClass}>(i) Act & Sections</label>
                <input
                  type="text"
                  id="act1"
                  name="act1"
                  value={formData.act1}
                  onChange={handleInputChange}
                  placeholder="e.g., IPC Section 302"
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="act2" className={labelClass}>(ii) Act & Sections</label>
                <input
                  type="text"
                  id="act2"
                  name="act2"
                  value={formData.act2}
                  onChange={handleInputChange}
                  placeholder="e.g., IPC Section 120B"
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="act3" className={labelClass}>(iii) Act & Sections</label>
                <input
                  type="text"
                  id="act3"
                  name="act3"
                  value={formData.act3}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="otherActs" className={labelClass}>(iv) Other Acts & Sections</label>
                <input
                  type="text"
                  id="otherActs"
                  name="otherActs"
                  value={formData.otherActs}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
          </div>

          {/* Incident Timing */}
          <div className="mb-6">
            <div className={sectionTitleClass}>INCIDENT TIMING DETAILS</div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="occurrenceDay" className={labelClass}>Day of Occurrence</label>
                <select
                  id="occurrenceDay"
                  name="occurrenceDay"
                  value={formData.occurrenceDay}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              </div>
              <div>
                <label htmlFor="occurrenceDate" className={labelClass}>
                  Date of Occurrence <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="occurrenceDate"
                  name="occurrenceDate"
                  value={formData.occurrenceDate}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
              <div>
                <label htmlFor="occurrenceTime" className={labelClass}>Time of Occurrence</label>
                <input
                  type="time"
                  id="occurrenceTime"
                  name="occurrenceTime"
                  value={formData.occurrenceTime}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="infoReceivedDate" className={labelClass}>Date Info Received at P.S.</label>
                <input
                  type="date"
                  id="infoReceivedDate"
                  name="infoReceivedDate"
                  value={formData.infoReceivedDate}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="infoReceivedTime" className={labelClass}>Time Info Received</label>
                <input
                  type="time"
                  id="infoReceivedTime"
                  name="infoReceivedTime"
                  value={formData.infoReceivedTime}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="gdEntry" className={labelClass}>General Diary Entry Number</label>
                <input
                  type="text"
                  id="gdEntry"
                  name="gdEntry"
                  value={formData.gdEntry}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="gdTime" className={labelClass}>GD Entry Time</label>
                <input
                  type="time"
                  id="gdTime"
                  name="gdTime"
                  value={formData.gdTime}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
          </div>

          {/* Information Type */}
          <div className="mb-6">
            <div className={sectionTitleClass}>TYPE OF INFORMATION</div>
            <div className="flex gap-5 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="infoType"
                  value="Written"
                  checked={formData.infoType === 'Written'}
                  onChange={handleInputChange}
                  disabled={isPreview}
                />
                Written
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="infoType"
                  value="Oral"
                  checked={formData.infoType === 'Oral'}
                  onChange={handleInputChange}
                  disabled={isPreview}
                />
                Oral
              </label>
            </div>
          </div>

          {/* Place of Occurrence */}
          <div className="mb-6">
            <div className={sectionTitleClass}>PLACE OF OCCURRENCE</div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="distanceFromPS" className={labelClass}>Distance & Direction from P.S.</label>
                <input
                  type="text"
                  id="distanceFromPS"
                  name="distanceFromPS"
                  value={formData.distanceFromPS}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 km North"
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="beatNumber" className={labelClass}>Beat Number</label>
                <input
                  type="text"
                  id="beatNumber"
                  name="beatNumber"
                  value={formData.beatNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="occurrenceAddress" className={labelClass}>
                Address of Occurrence <span className="text-red-500">*</span>
              </label>
              <textarea
                id="occurrenceAddress"
                name="occurrenceAddress"
                value={formData.occurrenceAddress}
                onChange={handleInputChange}
                rows="3"
                className={inputClass}
                disabled={isPreview}
                required
              />
            </div>
            <div>
              <label htmlFor="outsidePS" className={labelClass}>Name of P.S. & District (if outside limits)</label>
              <input
                type="text"
                id="outsidePS"
                name="outsidePS"
                value={formData.outsidePS}
                onChange={handleInputChange}
                className={inputClass}
                disabled={isPreview}
              />
            </div>
          </div>

          {/* Complainant Details */}
          <div className="mb-6">
            <div className={sectionTitleClass}>COMPLAINANT DETAILS</div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="complainantName" className={labelClass}>
                  Name of Complainant <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="complainantName"
                  name="complainantName"
                  value={formData.complainantName}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
              <div>
                <label htmlFor="fatherHusbandName" className={labelClass}>
                  Father's/Husband's Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fatherHusbandName"
                  name="fatherHusbandName"
                  value={formData.fatherHusbandName}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="complainantDOB" className={labelClass}>Date of Birth</label>
                <input
                  type="date"
                  id="complainantDOB"
                  name="complainantDOB"
                  value={formData.complainantDOB}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="nationality" className={labelClass}>Nationality</label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="passportNumber" className={labelClass}>Passport Number</label>
                <input
                  type="text"
                  id="passportNumber"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="passportDate" className={labelClass}>Date of Issue</label>
                <input
                  type="date"
                  id="passportDate"
                  name="passportDate"
                  value={formData.passportDate}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="passportPlace" className={labelClass}>Place of Issue</label>
                <input
                  type="text"
                  id="passportPlace"
                  name="passportPlace"
                  value={formData.passportPlace}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="occupation" className={labelClass}>
                Occupation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className={inputClass}
                disabled={isPreview}
                required
              />
            </div>
            <div>
              <label htmlFor="complainantAddress" className={labelClass}>
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="complainantAddress"
                name="complainantAddress"
                value={formData.complainantAddress}
                onChange={handleInputChange}
                rows="3"
                className={inputClass}
                disabled={isPreview}
                required
              />
            </div>
          </div>

          {/* Details of Known/Unknown Accused */}
          <div className="mb-6">
            <div className={sectionTitleClass}>DETAILS OF KNOWN/UNKNOWN/SUSPECTED ACCUSED</div>
            <div>
              <label htmlFor="accusedDetails" className={labelClass}>Name(s) and other particulars of accused/suspect(s)</label>
              <textarea
                id="accusedDetails"
                name="accusedDetails"
                value={formData.accusedDetails}
                onChange={handleInputChange}
                rows="5"
                placeholder="Provide detailed description including name, age, address, physical description, etc."
                className={inputClass}
                disabled={isPreview}
              />
            </div>
          </div>

          {/* Reasons for Delay */}
          <div className="mb-6">
            <div className={sectionTitleClass}>REASONS FOR DELAY IN REPORTING</div>
            <div>
              <label htmlFor="delayReason" className={labelClass}>Reasons for delay (if any)</label>
              <textarea
                id="delayReason"
                name="delayReason"
                value={formData.delayReason}
                onChange={handleInputChange}
                rows="3"
                placeholder="Explain any delay in reporting the incident"
                className={inputClass}
                disabled={isPreview}
              />
            </div>
          </div>

          {/* Particulars of Properties */}
          <div className="mb-6">
            <div className={sectionTitleClass}>PARTICULARS OF PROPERTIES STOLEN/INVOLVED</div>
            <div>
              <label htmlFor="propertyDetails" className={labelClass}>Details of property stolen/involved</label>
              <textarea
                id="propertyDetails"
                name="propertyDetails"
                value={formData.propertyDetails}
                onChange={handleInputChange}
                rows="4"
                placeholder="Description of stolen/damaged/involved property with estimated value"
                className={inputClass}
                disabled={isPreview}
              />
            </div>
          </div>

          {/* Total Value */}
          <div className="mb-6">
            <div className={sectionTitleClass}>TOTAL VALUE OF PROPERTY STOLEN/INVOLVED</div>
            <div className="md:w-1/2">
              <label htmlFor="propertyValue" className={labelClass}>Estimated Value (₹)</label>
              <input
                type="number"
                id="propertyValue"
                name="propertyValue"
                value={formData.propertyValue}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className={inputClass}
                disabled={isPreview}
              />
            </div>
          </div>

          {/* Brief Facts */}
          <div className="mb-6">
            <div className={sectionTitleClass}>BRIEF FACTS OF THE CASE</div>
            <div>
              <label htmlFor="briefFacts" className={labelClass}>
                Complaint/Information <span className="text-red-500">*</span>
              </label>
              <textarea
                id="briefFacts"
                name="briefFacts"
                value={formData.briefFacts}
                onChange={handleInputChange}
                rows="8"
                placeholder="Provide detailed description of the incident, sequence of events, and all relevant information"
                className={inputClass}
                disabled={isPreview}
                required
              />
            </div>
          </div>

          {/* Action Taken */}
          <div className="mb-6">
            <div className={sectionTitleClass}>ACTION TAKEN</div>
            <div className="mb-4">
              <label htmlFor="actionTaken" className={labelClass}>Since the above report reveals commission of offence(s) as mentioned at item 2, registered the case and took up investigation</label>
              <textarea
                id="actionTaken"
                name="actionTaken"
                value={formData.actionTaken}
                onChange={handleInputChange}
                rows="3"
                className={inputClass}
                disabled={isPreview}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="investigatingOfficer" className={labelClass}>Name of Investigating Officer</label>
                <input
                  type="text"
                  id="investigatingOfficer"
                  name="investigatingOfficer"
                  value={formData.investigatingOfficer}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
              <div>
                <label htmlFor="officerRank" className={labelClass}>Rank</label>
                <input
                  type="text"
                  id="officerRank"
                  name="officerRank"
                  value={formData.officerRank}
                  onChange={handleInputChange}
                  className={inputClass}
                  disabled={isPreview}
                />
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="flex flex-col md:flex-row justify-between gap-5 mt-8">
            <div className="w-48 h-20 border-2 border-gray-800 flex items-center justify-center bg-gray-50 text-center text-sm">
              <span>Signature/Thumb Impression<br />of the Complainant</span>
            </div>
            <div className="w-48 h-20 border-2 border-gray-800 flex items-center justify-center bg-gray-50 text-center text-sm">
              <span>Signature of the Officer<br />in charge, Police Station</span>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        {!isPreview && (
          <div className="mt-8 text-center border-t-2 border-gray-200 pt-5">
            <div className="flex justify-center gap-4 mb-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                />
                Show NyayaSetu Watermark
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showHeader}
                  onChange={(e) => setShowHeader(e.target.checked)}
                />
                Show NyayaSetu Header
              </label>
            </div>
            
            <div className="space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Reset Form
              </button>
              <button
                type="button"
                onClick={previewForm}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={downloadPDF}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
  );
};

export default Firr;