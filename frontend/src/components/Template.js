import React, { useState } from 'react';
import { FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';

const LegalTemplatesGenerator = () => {
  const [expandedTemplate, setExpandedTemplate] = useState(null);
  const [formData, setFormData] = useState({});

  const templates = [
    {
      id: 'fir',
      name: 'First Information Report (FIR)',
      icon: '👮',
      fields: [
        { name: 'complainantName', label: 'Complainant Name', type: 'text', required: true },
        { name: 'complainantAddress', label: 'Complainant Address', type: 'textarea', required: true },
        { name: 'complainantPhone', label: 'Contact Number', type: 'text', required: true },
        { name: 'dateTime', label: 'Date and Time of Incident', type: 'datetime-local', required: true },
        { name: 'location', label: 'Location of Incident', type: 'text', required: true },
        { name: 'incidentDescription', label: 'Incident Description', type: 'textarea', required: true, rows: 6 },
        { name: 'suspectDetails', label: 'Suspect Details (if known)', type: 'textarea', rows: 3 },
        { name: 'witnessDetails', label: 'Witness Details (if any)', type: 'textarea', rows: 3 },
        { name: 'policeStation', label: 'Police Station Name', type: 'text', required: true }
      ],
      generate: (data) => {
        return `FIRST INFORMATION REPORT
(Under Section 154 Cr.P.C.)

Police Station: ${data.policeStation || '_______________'}
Date of Report: ${new Date().toLocaleDateString('en-IN')}

1. COMPLAINANT DETAILS:
   Name: ${data.complainantName || '_______________'}
   Address: ${data.complainantAddress || '_______________'}
   Contact Number: ${data.complainantPhone || '_______________'}

2. INCIDENT DETAILS:
   Date and Time: ${data.dateTime ? new Date(data.dateTime).toLocaleString('en-IN') : '_______________'}
   Place of Occurrence: ${data.location || '_______________'}

3. DESCRIPTION OF INCIDENT:
${data.incidentDescription || '_______________'}

${data.suspectDetails ? `4. SUSPECT DETAILS:\n${data.suspectDetails}\n\n` : ''}${data.witnessDetails ? `5. WITNESS DETAILS:\n${data.witnessDetails}\n\n` : ''}I hereby declare that the above information is true to the best of my knowledge and belief.

Date: ${new Date().toLocaleDateString('en-IN')}
Place: _______________

_______________________
Signature of Complainant
${data.complainantName || '_______________'}


_______________________
Signature of Recording Officer
Police Station: ${data.policeStation || '_______________'}`;
      }
    },
    {
      id: 'legal_notice',
      name: 'Legal Notice',
      icon: '⚖️',
      fields: [
        { name: 'senderName', label: 'Sender Name', type: 'text', required: true },
        { name: 'senderAddress', label: 'Sender Address', type: 'textarea', required: true },
        { name: 'recipientName', label: 'Recipient Name', type: 'text', required: true },
        { name: 'recipientAddress', label: 'Recipient Address', type: 'textarea', required: true },
        { name: 'issue', label: 'Subject/Issue', type: 'text', required: true },
        { name: 'disputeSummary', label: 'Dispute Summary', type: 'textarea', required: true, rows: 6 },
        { name: 'actionRequested', label: 'Action Requested', type: 'textarea', required: true, rows: 4 },
        { name: 'deadline', label: 'Response Deadline (days)', type: 'number', required: true }
      ],
      generate: (data) => {
        const deadlineNum = parseInt(data.deadline) || 15;
        const deadlineDate = new Date();
        deadlineDate.setDate(deadlineDate.getDate() + deadlineNum);
        return `LEGAL NOTICE

Date: ${new Date().toLocaleDateString('en-IN')}

To,
${data.recipientName || '_______________'}
${data.recipientAddress || '_______________'}

From,
${data.senderName || '_______________'}
${data.senderAddress || '_______________'}

Subject: Legal Notice regarding ${data.issue || '_______________'}

Dear Sir/Madam,

Under instructions from and on behalf of my client, ${data.senderName || '_______________'}, I hereby serve upon you this Legal Notice under the following facts and circumstances:

FACTS OF THE CASE:

${data.disputeSummary || '_______________'}

DEMAND:

In view of the aforesaid facts and circumstances, my client hereby calls upon you to:

${data.actionRequested || '_______________'}

You are hereby given ${deadlineNum} days from the receipt of this notice to comply with the above demand, failing which my client shall be constrained to initiate appropriate legal proceedings against you, including but not limited to civil and/or criminal proceedings, without any further reference to you.

The cost, consequences, and expenses of such proceedings shall be entirely at your risk and responsibility.

This notice is issued without prejudice to all other rights, remedies, and contentions of my client, all of which are expressly reserved.

TAKE NOTICE AND ACT ACCORDINGLY.

Yours faithfully,

_______________________
${data.senderName || '_______________'}

Date: ${new Date().toLocaleDateString('en-IN')}
Place: _______________

Note: This notice should be sent via registered post with acknowledgment due and/or through email for record purposes.`;
      }
    },
    {
      id: 'rti',
      name: 'RTI Application',
      icon: '📋',
      fields: [
        { name: 'applicantName', label: 'Applicant Name', type: 'text', required: true },
        { name: 'applicantAddress', label: 'Applicant Address', type: 'textarea', required: true },
        { name: 'applicantPhone', label: 'Contact Number', type: 'text', required: true },
        { name: 'applicantEmail', label: 'Email Address', type: 'email' },
        { name: 'publicAuthority', label: 'Public Authority/Department', type: 'text', required: true },
        { name: 'pioName', label: 'PIO Name (if known)', type: 'text' },
        { name: 'informationSought', label: 'Information Sought', type: 'textarea', required: true, rows: 6 },
        { name: 'period', label: 'Period of Information (if applicable)', type: 'text' },
        { name: 'bplCard', label: 'BPL Card Holder?', type: 'select', options: ['No', 'Yes'] }
      ],
      generate: (data) => {
        return `APPLICATION UNDER RIGHT TO INFORMATION ACT, 2005

Date: ${new Date().toLocaleDateString('en-IN')}

To,
The Public Information Officer (PIO)
${data.publicAuthority || '_______________'}
${data.pioName ? `\nAttn: ${data.pioName}` : ''}

Subject: Application under Section 6(1) of the Right to Information Act, 2005

Respected Sir/Madam,

I, ${data.applicantName || '_______________'}, a citizen of India, hereby request the following information under the Right to Information Act, 2005:

APPLICANT DETAILS:
Name: ${data.applicantName || '_______________'}
Address: ${data.applicantAddress || '_______________'}
Contact Number: ${data.applicantPhone || '_______________'}
${data.applicantEmail ? `Email: ${data.applicantEmail}` : ''}

INFORMATION REQUESTED:

${data.informationSought || '_______________'}

${data.period ? `Period: ${data.period}\n\n` : ''}I request that the information be provided in the form of:
☐ Photocopies of relevant records
☐ Certified copies
☐ Information in electronic form (email/CD)
☐ Inspection of records

${data.bplCard === 'Yes' ? 'I am a Below Poverty Line (BPL) card holder and request exemption from payment of application fee under Section 7(5) of the RTI Act.\n\n' : 'I am enclosing herewith the application fee of Rs. 10/- (Rupees Ten Only) in the form of:\n☐ Cash Receipt\n☐ Demand Draft/Bankers Cheque\n☐ Indian Postal Order\n\n'}I request you to provide the information within the statutory period of 30 days as mandated under Section 7(1) of the RTI Act, 2005. In case the information sought concerns the life or liberty of a person, I request that it be provided within 48 hours as per Section 7(1) of the Act.

If you are not the appropriate authority to receive this application, kindly transfer it to the concerned Public Information Officer under Section 6(3) of the Act and inform me accordingly.

Thanking you,

Yours faithfully,

_______________________
${data.applicantName || '_______________'}

Date: ${new Date().toLocaleDateString('en-IN')}
Place: _______________

Enclosures:
1. ${data.bplCard === 'Yes' ? 'Copy of BPL Card' : 'Application Fee Receipt'}`;
      }
    },
    {
      id: 'complaint',
      name: 'Complaint Letter',
      icon: '✉️',
      fields: [
        { name: 'complainantName', label: 'Your Name', type: 'text', required: true },
        { name: 'complainantAddress', label: 'Your Address', type: 'textarea', required: true },
        { name: 'complainantPhone', label: 'Your Contact Number', type: 'text', required: true },
        { name: 'complainantEmail', label: 'Your Email', type: 'email' },
        { name: 'recipientName', label: 'Recipient Name/Designation', type: 'text', required: true },
        { name: 'recipientOrganization', label: 'Organization/Department', type: 'text', required: true },
        { name: 'recipientAddress', label: 'Recipient Address', type: 'textarea', required: true },
        { name: 'subject', label: 'Subject of Complaint', type: 'text', required: true },
        { name: 'incidentDetails', label: 'Details of Incident/Issue', type: 'textarea', required: true, rows: 6 },
        { name: 'resolutionRequested', label: 'Resolution Requested', type: 'textarea', required: true, rows: 3 }
      ],
      generate: (data) => {
        return `${data.complainantName || '_______________'}
${data.complainantAddress || '_______________'}
Contact: ${data.complainantPhone || '_______________'}
${data.complainantEmail ? `Email: ${data.complainantEmail}` : ''}

Date: ${new Date().toLocaleDateString('en-IN')}

To,
${data.recipientName || '_______________'}
${data.recipientOrganization || '_______________'}
${data.recipientAddress || '_______________'}

Subject: ${data.subject || '_______________'}

Dear Sir/Madam,

I am writing to bring to your kind attention the following matter that requires your immediate consideration and appropriate action.

DETAILS OF COMPLAINT:

${data.incidentDetails || '_______________'}

This situation has caused me considerable inconvenience and distress. I believe this matter warrants immediate attention and resolution.

RESOLUTION REQUESTED:

${data.resolutionRequested || '_______________'}

I trust that you will look into this matter with the seriousness it deserves and take necessary corrective action at the earliest. I would appreciate a written response regarding the steps being taken to address this complaint within 15 days of receipt of this letter.

Should you require any additional information or clarification, please feel free to contact me at the above-mentioned contact details.

I look forward to a prompt and satisfactory resolution of this matter.

Thanking you for your attention to this matter.

Yours sincerely,

_______________________
${data.complainantName || '_______________'}

Date: ${new Date().toLocaleDateString('en-IN')}
Place: _______________`;
      }
    },
    {
      id: 'contract',
      name: 'Legal Agreement/Contract',
      icon: '📄',
      fields: [
        { name: 'partyAName', label: 'Party A (First Party) Name', type: 'text', required: true },
        { name: 'partyAAddress', label: 'Party A Address', type: 'textarea', required: true },
        { name: 'partyBName', label: 'Party B (Second Party) Name', type: 'text', required: true },
        { name: 'partyBAddress', label: 'Party B Address', type: 'textarea', required: true },
        { name: 'purpose', label: 'Purpose of Agreement', type: 'text', required: true },
        { name: 'partyAResponsibilities', label: 'Party A Responsibilities', type: 'textarea', required: true, rows: 4 },
        { name: 'partyBResponsibilities', label: 'Party B Responsibilities', type: 'textarea', required: true, rows: 4 },
        { name: 'startDate', label: 'Agreement Start Date', type: 'date', required: true },
        { name: 'duration', label: 'Duration/Term', type: 'text', required: true },
        { name: 'consideration', label: 'Consideration/Payment Terms', type: 'textarea', required: true, rows: 3 },
        { name: 'terminationClause', label: 'Termination Conditions', type: 'textarea', rows: 3 }
      ],
      generate: (data) => {
        const today = new Date();
        return `AGREEMENT

This Agreement is made and entered into on this ${today.toLocaleDateString('en-IN', { day: 'numeric' })} day of ${today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} at _______________

BETWEEN:

${data.partyAName || '_______________'}, residing at ${data.partyAAddress || '_______________'} (hereinafter referred to as "Party A" or "First Party", which expression shall, unless repugnant to the context or meaning thereof, include its successors, administrators, and permitted assigns)

OF THE FIRST PART

AND

${data.partyBName || '_______________'}, residing at ${data.partyBAddress || '_______________'} (hereinafter referred to as "Party B" or "Second Party", which expression shall, unless repugnant to the context or meaning thereof, include its successors, administrators, and permitted assigns)

OF THE SECOND PART

Party A and Party B are hereinafter collectively referred to as "Parties" and individually as "Party".

WHEREAS the Parties desire to enter into this Agreement for ${data.purpose || '_______________'};

AND WHEREAS both Parties have mutually agreed to the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants, promises, and agreements contained herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

1. PURPOSE
   This Agreement is executed for the purpose of ${data.purpose || '_______________'}.

2. TERM OF AGREEMENT
   This Agreement shall commence on ${data.startDate ? new Date(data.startDate).toLocaleDateString('en-IN') : '_______________'} and shall continue for a period of ${data.duration || '_______________'}, unless terminated earlier as per the provisions of this Agreement.

3. RESPONSIBILITIES OF PARTY A
${data.partyAResponsibilities || '_______________'}

4. RESPONSIBILITIES OF PARTY B
${data.partyBResponsibilities || '_______________'}

5. CONSIDERATION
${data.consideration || '_______________'}

6. TERMINATION
${data.terminationClause || 'Either Party may terminate this Agreement by giving 30 (thirty) days written notice to the other Party. In the event of material breach of any term of this Agreement by either Party, the non-breaching Party may terminate this Agreement immediately upon written notice.'}

7. CONFIDENTIALITY
   Both Parties agree to maintain confidentiality of all information shared during the term of this Agreement and shall not disclose the same to any third party without prior written consent of the other Party.

8. DISPUTE RESOLUTION
   Any dispute arising out of or in connection with this Agreement shall be resolved through mutual discussion and negotiation. If the dispute cannot be resolved amicably, it shall be referred to arbitration in accordance with the Arbitration and Conciliation Act, 1996, and the decision of the arbitrator shall be final and binding on both Parties.

9. GOVERNING LAW
   This Agreement shall be governed by and construed in accordance with the laws of India.

10. ENTIRE AGREEMENT
    This Agreement constitutes the entire agreement between the Parties and supersedes all prior agreements, understandings, negotiations, and discussions, whether oral or written, between the Parties.

11. AMENDMENTS
    No amendment, modification, or waiver of any provision of this Agreement shall be valid unless in writing and signed by both Parties.

IN WITNESS WHEREOF, the Parties have executed this Agreement on the day, month, and year first above written.


PARTY A                                    PARTY B

_______________________                    _______________________
${data.partyAName || '_______________'}    ${data.partyBName || '_______________'}


WITNESSES:

1. _______________________                 2. _______________________
   Name:                                      Name:
   Address:                                   Address:`;
      }
    },
    {
      id: 'poa',
      name: 'Power of Attorney',
      icon: '🔑',
      fields: [
        { name: 'grantorName', label: 'Grantor Name (Principal)', type: 'text', required: true },
        { name: 'grantorAddress', label: 'Grantor Address', type: 'textarea', required: true },
        { name: 'grantorAge', label: 'Grantor Age', type: 'number', required: true },
        { name: 'granteeName', label: 'Grantee Name (Attorney)', type: 'text', required: true },
        { name: 'granteeAddress', label: 'Grantee Address', type: 'textarea', required: true },
        { name: 'granteeAge', label: 'Grantee Age', type: 'number', required: true },
        { name: 'granteeRelation', label: 'Relation to Grantor', type: 'text', required: true },
        { name: 'powers', label: 'Powers Granted', type: 'textarea', required: true, rows: 6 },
        { name: 'duration', label: 'Duration/Validity', type: 'text', required: true },
        { name: 'revocable', label: 'Revocable?', type: 'select', options: ['Yes', 'No'], required: true }
      ],
      generate: (data) => {
        const today = new Date();
        return `POWER OF ATTORNEY

KNOW ALL MEN BY THESE PRESENTS:

I, ${data.grantorName || '_______________'}, aged ${data.grantorAge || '___'} years, residing at ${data.grantorAddress || '_______________'} (hereinafter referred to as the "Principal" or "Grantor"), do hereby nominate, constitute, and appoint:

${data.granteeName || '_______________'}, aged ${data.granteeAge || '___'} years, ${data.granteeRelation || '_______________'}, residing at ${data.granteeAddress || '_______________'} (hereinafter referred to as the "Attorney" or "Grantee")

as my true and lawful Attorney to act in my name and on my behalf and to do and execute all or any of the following acts, deeds, matters, and things:

POWERS GRANTED:

${data.powers || '_______________'}

DURATION AND VALIDITY:

This Power of Attorney shall remain in force for ${data.duration || '_______________'}.

REVOCATION:

This Power of Attorney is ${data.revocable === 'Yes' ? 'revocable and may be revoked by the Principal at any time by giving written notice to the Attorney and publishing such revocation in a newspaper of wide circulation' : 'irrevocable and cannot be revoked during its term'}.

INDEMNITY:

I hereby agree to ratify and confirm all acts, deeds, matters, and things done by my said Attorney pursuant to this Power of Attorney. I shall indemnify and keep indemnified my said Attorney from and against all claims, demands, actions, proceedings, losses, damages, costs, charges, and expenses whatsoever which my said Attorney may incur or be subject to by reason of or in connection with the execution of this Power of Attorney.

GENERAL PROVISIONS:

1. The Attorney shall act in good faith and in the best interests of the Principal at all times.

2. The Attorney shall maintain proper accounts and records of all transactions carried out under this Power of Attorney and shall produce the same to the Principal on demand.

3. This Power of Attorney shall be governed by and construed in accordance with the laws of India.

4. Any dispute arising out of or in connection with this Power of Attorney shall be subject to the exclusive jurisdiction of the courts at _______________.

IN WITNESS WHEREOF, I, the Principal, have executed this Power of Attorney on this ${today.toLocaleDateString('en-IN', { day: 'numeric' })} day of ${today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })} at _______________.


PRINCIPAL (GRANTOR)

_______________________
${data.grantorName || '_______________'}


ACCEPTED BY ATTORNEY (GRANTEE)

_______________________
${data.granteeName || '_______________'}


WITNESSES:

1. _______________________                 2. _______________________
   Name:                                      Name:
   Address:                                   Address:
   Signature:                                 Signature:


NOTARY PUBLIC

Signed, sealed, and delivered in the presence of:

_______________________
Notary Public
Seal:`;
      }
    },
    {
      id: 'petition',
      name: 'Civil Petition',
      icon: '⚖️',
      fields: [
        { name: 'courtName', label: 'Name of Court', type: 'text', required: true },
        { name: 'petitionerName', label: 'Petitioner Name', type: 'text', required: true },
        { name: 'petitionerAddress', label: 'Petitioner Address', type: 'textarea', required: true },
        { name: 'respondentName', label: 'Respondent Name', type: 'text', required: true },
        { name: 'respondentAddress', label: 'Respondent Address', type: 'textarea', required: true },
        { name: 'caseType', label: 'Type of Case', type: 'text', required: true },
        { name: 'claimSummary', label: 'Summary of Claim/Grounds', type: 'textarea', required: true, rows: 8 },
        { name: 'reliefSought', label: 'Relief Sought', type: 'textarea', required: true, rows: 5 },
        { name: 'valuation', label: 'Valuation of Suit (if applicable)', type: 'text' }
      ],
      generate: (data) => {
        const today = new Date();
        const courtName = data.courtName || '_______________';
        return `IN THE ${courtName.toUpperCase()}

${(data.caseType || '_______________').toUpperCase()}

Civil Petition No. _______ of ${today.getFullYear()}

IN THE MATTER OF:

${data.petitionerName || '_______________'}
${data.petitionerAddress || '_______________'}
                                                                    ...PETITIONER

VERSUS

${data.respondentName || '_______________'}
${data.respondentAddress || '_______________'}
                                                                    ...RESPONDENT

${data.valuation ? `\nValuation: Rs. ${data.valuation}` : ''}

PETITION UNDER _______________

TO,
THE HONBLE COURT

THE HUMBLE PETITION OF THE PETITIONER ABOVE-NAMED

MOST RESPECTFULLY SHOWETH:

1. That the Petitioner is a resident of ${(data.petitionerAddress || '_______________').split('\n')[0]} and is a person of sound mind and capable of entering into contracts.

2. That the Respondent is a resident of ${(data.respondentAddress || '_______________').split('\n')[0]} and can be served at the above-mentioned address.

3. That this Honble Court has the jurisdiction to entertain and try this Petition.

4. FACTS OF THE CASE:

${data.claimSummary || '_______________'}

5. That the cause of action for filing this Petition arose on _______________ and is continuing.

6. That the Petitioner has no other efficacious remedy except to approach this Honble Court for the reliefs claimed herein.

7. That this Petition is being filed within the period of limitation prescribed under law.

8. That the Petitioner has not filed any other Petition or suit in any other Court in respect of the same cause of action.

PRAYER:

In light of the facts and circumstances stated above, it is most respectfully prayed that this Honble Court may be pleased to:

${data.reliefSought || '_______________'}

AND/OR

Pass such other and further orders as this Honble Court may deem fit and proper in the facts and circumstances of the case in the interest of justice, equity, and good conscience.

AND FOR THIS ACT OF KINDNESS, THE PETITIONER AS IN DUTY BOUND SHALL EVER PRAY.


PETITIONER THROUGH COUNSEL

Date: ${today.toLocaleDateString('en-IN')}
Place: _______________


_______________________
Advocate for the Petitioner
Enrolment No.: _______________


VERIFICATION

I, ${data.petitionerName || '_______________'}, the Petitioner above-named, do hereby verify that the contents of paragraphs 1 to 8 of the above Petition are true and correct to my knowledge, no part of it is false, and nothing material has been concealed therefrom.

Verified at _______________ on this ${today.toLocaleDateString('en-IN', { day: 'numeric' })} day of ${today.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}.


_______________________
PETITIONER

LIST OF ENCLOSURES:

1. _______________
2. _______________
3. _______________`;
      }
    },
    {
      id: 'consent',
      name: 'Consent/Declaration',
      icon: '✍️',
      fields: [
        { name: 'declarantName', label: 'Declarant Name', type: 'text', required: true },
        { name: 'declarantAddress', label: 'Declarant Address', type: 'textarea', required: true },
        { name: 'declarantAge', label: 'Age', type: 'number', required: true },
        { name: 'declarantId', label: 'ID Proof Type & Number', type: 'text', required: true },
        { name: 'purpose', label: 'Purpose of Declaration/Consent', type: 'text', required: true },
        { name: 'declarationText', label: 'Declaration/Consent Statement', type: 'textarea', required: true, rows: 6 },
        { name: 'duration', label: 'Validity Period (if applicable)', type: 'text' },
        { name: 'recipientName', label: 'To Whom Addressed (if applicable)', type: 'text' },
        { name: 'recipientOrganization', label: 'Organization (if applicable)', type: 'text' }
      ],
      generate: (data) => {
        const today = new Date();
        const header = (data.recipientName || data.recipientOrganization) 
          ? `To,\n${data.recipientName ? data.recipientName + '\n' : ''}${data.recipientOrganization ? data.recipientOrganization + '\n' : ''}\n`
          : '';
        return `${header}DECLARATION / CONSENT

Subject: ${data.purpose || '_______________'}

I, ${data.declarantName || '_______________'}, aged ${data.declarantAge || '___'} years, residing at ${data.declarantAddress || '_______________'}, holder of ${data.declarantId || '_______________'}, do hereby solemnly declare and affirm as follows:

DECLARATION:

${data.declarationText || '_______________'}

${data.duration ? `VALIDITY:\n\nThis consent/declaration shall remain valid for ${data.duration}.\n\n` : ''}I hereby confirm that:

1. I am making this declaration/giving this consent voluntarily and of my own free will, without any coercion, undue influence, or pressure from any person.

2. I am of sound mind and understand the nature and consequences of this declaration/consent.

3. All the information provided by me in this declaration is true, correct, and complete to the best of my knowledge and belief.

4. I understand that any false declaration or misrepresentation may attract legal consequences.

5. I agree to indemnify and hold harmless ${data.recipientName || data.recipientOrganization || 'all concerned parties'} from any claims, demands, or actions arising from this declaration/consent.

I undertake that if any of the information furnished by me is found to be false or misleading, my consent/declaration shall stand cancelled and I shall be liable for legal action.

I have read and understood the contents of this declaration, and I affix my signature as a token of my consent and acceptance.


Date: ${today.toLocaleDateString('en-IN')}
Place: _______________


_______________________
Signature of Declarant
Name: ${data.declarantName || '_______________'}


WITNESSES:

I hereby certify that the above declaration was made before me and the declarant has affixed his/her signature in my presence after understanding the contents thereof.

1. _______________________                 2. _______________________
   Name:                                      Name:
   Address:                                   Address:
   Signature:                                 Signature:


NOTARY PUBLIC (if required)

_______________________
Notary Public
Seal:
Date:`;
      }
    }
  ];

  const handleInputChange = (templateId, fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [templateId]: {
        ...prev[templateId],
        [fieldName]: value
      }
    }));
  };

  const generateDocument = (template) => {
    const data = formData[template.id] || {};
    const content = template.generate(data);
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = (template) => {
    const data = formData[template.id] || {};
    const content = template.generate(data);
    navigator.clipboard.writeText(content);
    alert('Document copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
              <button
                onClick={() => setExpandedTemplate(expandedTemplate === template.id ? null : template.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{template.icon}</span>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-slate-800">{template.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {template.fields.length} fields to complete
                    </p>
                  </div>
                </div>
                {expandedTemplate === template.id ? (
                  <ChevronUp className="w-6 h-6 text-slate-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-400" />
                )}
              </button>

              {expandedTemplate === template.id && (
                <div className="p-6 border-t border-slate-200 bg-slate-50">
                  <div className="grid gap-4">
                    {template.fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        {field.type === 'textarea' ? (
                          <textarea
                            value={formData[template.id]?.[field.name] || ''}
                            onChange={(e) => handleInputChange(template.id, field.name, e.target.value)}
                            rows={field.rows || 3}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            value={formData[template.id]?.[field.name] || field.options[0]}
                            onChange={(e) => handleInputChange(template.id, field.name, e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {field.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={formData[template.id]?.[field.name] || ''}
                            onChange={(e) => handleInputChange(template.id, field.name, e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => generateDocument(template)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Download className="w-5 h-5" />
                      Download Document
                    </button>
                    <button
                      onClick={() => copyToClipboard(template)}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                    >
                      <FileText className="w-5 h-5" />
                      Copy to Clipboard
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>Note:</strong> This is a template document. Please review and modify as needed. 
                      For legal matters, it is recommended to consult with a qualified legal professional.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-900 mb-2">⚠️ Important Legal Disclaimer</h3>
          <p className="text-sm text-amber-800">
            These templates are provided for informational purposes only and do not constitute legal advice. 
            Laws vary by jurisdiction and individual circumstances. Always consult with a qualified lawyer 
            before using these documents for official legal purposes. The creator assumes no liability for 
            any use or misuse of these templates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalTemplatesGenerator;