import React from 'react';

interface Learner {
  id: string;
  name: string;
  regNo: string;
}

interface TemplateProps {
  learner: Learner;
  allLearners?: Learner[];
  assessorName: string;
  verifierName: string;
  date: string;
  programmeTitle?: string;
  unitTitle?: string;
  assignmentTitle?: string;
  criteria?: string;
}

// Reusable parts
const PrintStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @media print {
      @page landscape-page {
        size: landscape;
        margin: 10mm;
      }
      .landscape-page {
        page: landscape-page;
      }
    }
  `}} />
);

const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-lg mb-8 p-[20mm] text-sm text-slate-800 font-sans border border-slate-200 print:shadow-none print:border-none print:m-0 break-after-page relative">
    <PrintStyles />
    {children}
  </div>
);

const LandscapePage = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white w-full max-w-[297mm] mx-auto min-h-[210mm] shadow-lg mb-8 p-[15mm] text-sm text-slate-800 font-sans border border-slate-200 print:shadow-none print:border-none print:m-0 break-after-page landscape-page relative flex flex-col justify-between overflow-hidden box-border">
    <PrintStyles />
    <div className="flex-1 pb-4">{children}</div>
  </div>
);

const SectionTitle = ({ children, color = "text-[#005c8a]" }: { children: React.ReactNode, color?: string }) => (
  <h2 className={`text-2xl font-light mb-4 mt-2 ${color}`}>{children}</h2>
);

const Table = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <table className={`w-full border-collapse border border-[#85bfe0] mb-6 text-xs ${className}`}>
    {children}
  </table>
);

const Tr = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <tr className={className}>{children}</tr>
);

const Th = ({ children, colSpan, rowSpan, className = "" }: { children: React.ReactNode, colSpan?: number, rowSpan?: number, className?: string }) => {
  const hasWidth = className.includes('w-') || colSpan;
  return (
    <th colSpan={colSpan} rowSpan={rowSpan} className={`border border-[#85bfe0] bg-[#eef6fa] text-[#005c8a] p-2 text-left font-semibold align-top ${hasWidth ? '' : 'w-1/3'} ${className}`}>
      {children}
    </th>
  );
};

const Td = ({ children, colSpan, rowSpan, className = "" }: { children: React.ReactNode, colSpan?: number, rowSpan?: number, className?: string }) => (
  <td colSpan={colSpan} rowSpan={rowSpan} className={`border border-[#85bfe0] p-2 align-top text-slate-700 ${className}`}>
    {children || <span className="opacity-0">-</span>}
  </td>
);

// 1. IV Assignment Brief
export const IVAssignmentBrief: React.FC<TemplateProps> = ({ assessorName, verifierName, date, programmeTitle, unitTitle, assignmentTitle, criteria }) => (
  <Page>
    <div className="flex justify-end mb-6">
       <div className="text-[#005c8a] font-bold text-xl flex items-center gap-2">Pearson | BTEC</div>
    </div>
    <SectionTitle>Internal Verification<br/><span className="font-semibold">Assignment Brief</span></SectionTitle>
    <Table>
      <tbody>
        <Tr><Th>Programme Title:</Th><Td colSpan={2}>{programmeTitle || 'BTEC International Level 2 Certificate in Hospitality'}</Td></Tr>
        <Tr><Th>Assessor Name:</Th><Td colSpan={2}>{assessorName}</Td></Tr>
        <Tr><Th>Internal Verifier Name:</Th><Td colSpan={2}>{verifierName}</Td></Tr>
        <Tr><Th>Unit or Component Number and Title:</Th><Td colSpan={2}>{unitTitle || 'Unit 1: Introducing the Hospitality Industry'}</Td></Tr>
        <Tr><Th>Assignment title:</Th><Td colSpan={2}>{assignmentTitle || 'Exploring Hospitality'}</Td></Tr>
        <Tr><Th>Assessment criteria targeted by this assignment brief:</Th><Td colSpan={2}>{criteria || 'P1, P2, M1, D1'}</Td></Tr>
        <Tr><Th>Is this an Authorised Assignment Brief published by Pearson?...</Th><Td colSpan={2}>Yes, unamended.</Td></Tr>
        <Tr><Th colSpan={2}>INTERNAL VERIFIER CHECKLIST</Th><th className="border border-[#85bfe0] bg-[#cbdce5] text-[#005c8a] p-2 font-semibold w-16 text-center">Y/N</th></Tr>
        <Tr><Td colSpan={2}>Are the programme and unit details accurate?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>*Are clear deadlines for assessment given?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Is the time frame of an appropriate duration?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Is there a suitable vocational scenario or context?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Are the assessment criteria to be addressed stated accurately?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Does each task show which criteria are being addressed?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Do the tasks meet the assessment requirements of the unit/s?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Is it clear what evidence the learner needs to generate?</Td><Td>Y</Td></Tr>
        <Tr><Td colSpan={2}>Is it likely to generate evidence that is valid and sufficient?</Td><Td>Y</Td></Tr>
        <Tr><Th colSpan={2}>Overall, is the Assignment fit for purpose?</Th><Td className="font-bold text-center">Yes</Td></Tr>
      </tbody>
    </Table>
    <Table>
      <tbody>
        <Tr><Th colSpan={3}>Action required:</Th></Tr>
        <Tr><Td colSpan={3} className="h-16">n/a</Td></Tr>
        <Tr>
          <Th>Internal Verifier signature</Th><Td>{verifierName}</Td><Th>Date</Th><Td>{date}</Td>
        </Tr>
        <Tr>
          <Th>Assessor signature</Th><Td>{assessorName}</Td><Th>Date</Th><Td>{date}</Td>
        </Tr>
      </tbody>
    </Table>
  </Page>
);

// 2. Record of Practical Activity
export const RecordOfPracticalActivity: React.FC<TemplateProps> = ({ learner, assessorName, date, unitTitle, criteria }) => (
  <Page>
    <div className="flex justify-end mb-6">
       <div className="text-[#005c8a] font-bold text-xl flex items-center gap-2">Pearson | BTEC</div>
    </div>
    <SectionTitle>BTEC Record of Practical Activity</SectionTitle>
    <Table>
      <tbody>
        <Tr>
          <Td colSpan={2} className="bg-[#eef6fa] text-[#005c8a] font-bold text-center relative border-[#85bfe0]">
            <span className="line-through opacity-50 mr-2">*Observation Record</span>
            <span>*Witness Statement</span>
          </Td>
        </Tr>
        <Tr><Th>Learner name:</Th><Td>{learner.name}</Td></Tr>
        <Tr><Th>Qualification:</Th><Td>BTEC International Level 2 Certificate in Hospitality</Td></Tr>
        <Tr><Th>Unit or Component number & title:</Th><Td>{unitTitle || 'Unit 1: Introducing the Hospitality Industry'}</Td></Tr>
        <Tr><Th>Name of *Observer/*Witness:</Th><Td>{assessorName}</Td></Tr>
        <Tr><Th>Date of Activity:</Th><Td>{date}</Td></Tr>
        <Tr><Th colSpan={2}>Assessment criteria targeted:</Th></Tr>
        <Tr><Td colSpan={2} className="h-8">{criteria || 'P1, P2'}</Td></Tr>
        <Tr><Th colSpan={2}>Description of activity undertaken:</Th></Tr>
        <Tr><Td colSpan={2} className="h-32">Learner demonstrated understanding of the hospitality sector...</Td></Tr>
        <Tr><Th colSpan={2}>Please state the evidence this record is in support of:</Th></Tr>
        <Tr><Td colSpan={2} className="h-16">Unit 1 Portfolio evidence</Td></Tr>
      </tbody>
    </Table>
    <div className="mb-2 text-xs font-semibold text-[#005c8a] bg-[#eef6fa] p-2 border border-[#85bfe0]">I confirm this is an accurate record of the activity undertaken</div>
    <Table>
      <tbody>
        <Tr><Th>Learner signature:</Th><Td>{learner.name}</Td><Th>Date:</Th><Td>{date}</Td></Tr>
        <Tr><Th colSpan={2}>*Assessor/*Witness signature:</Th><Td colSpan={2}>{assessorName}</Td></Tr>
        <Tr><Th>Role:</Th><Td>Assessor</Td><Th>Date:</Th><Td>{date}</Td></Tr>
      </tbody>
    </Table>
  </Page>
);

// 3. Assessment Record
export const AssessmentRecord: React.FC<TemplateProps> = ({ learner, assessorName, date, programmeTitle, unitTitle, assignmentTitle, criteria }) => {
  const criteriaList = (criteria || 'P1, P2').split(',').map(c => c.trim()).filter(c => c);

  const passComments = [
    "You described the topic clearly.",
    "Good understanding of the basics shown here.",
    "You demonstrated the right skills.",
    "You provided enough details to pass.",
    "Valid points were made clearly.",
    "A clear explanation was given.",
    "You met the requirements well.",
    "Basic skills were shown correctly.",
    "Relevant information was presented.",
    "You answered this part correctly.",
    "Satisfactory work on this section.",
    "You followed the instructions properly."
  ];

  const generalComments = [
    "Overall, a good effort. You met all the pass requirements.",
    "Well done on completing the pass tasks. Keep it up.",
    "You showed a solid understanding of the basic concepts.",
    "Satisfactory work across all pass criteria.",
    "You have successfully achieved the pass tasks for this unit.",
    "Good work completing the basic requirements.",
    "A steady performance on the core tasks."
  ];

  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
  };

  const getComment = (learnerName: string, criterion: string, isPass: boolean) => {
    if (!isPass) return "Target not achieved.";
    const index = getHash((learnerName || 'anon') + criterion) % passComments.length;
    return passComments[index];
  };

  const getGeneralComment = (learnerName: string, unit: string) => {
    const index = getHash((learnerName || 'anon') + unit) % generalComments.length;
    return generalComments[index];
  };

  return (
  <Page>
    <div className="flex justify-end mb-4">
       <div className="text-[#005c8a] font-bold text-xl flex items-center gap-2">Pearson | BTEC</div>
    </div>
    <div className="flex justify-between items-baseline mb-4">
      <h2 className="text-3xl font-bold text-[#005c8a]">Assessment record</h2>
      <span className="text-2xl text-[#85bfe0]">First submission</span>
    </div>
    <Table>
      <tbody>
        <Tr>
          <Th rowSpan={2}>Programme Title</Th>
          <Td rowSpan={2}>{programmeTitle || 'BTEC International Level 2 Certificate in Hospitality'}</Td>
          <Th>Learner Registration Number</Th>
          <Td>{learner.regNo}</Td>
        </Tr>
        <Tr>
          <Th>Learner Name</Th>
          <Td>{learner.name}</Td>
        </Tr>
        <Tr><Th>Assignment Title</Th><Td>{assignmentTitle || 'Exploring Hospitality'}</Td><Th>Assessor Name</Th><Td>{assessorName}</Td></Tr>
        <Tr><Th>Unit / Component Number and Title</Th><Td colSpan={3}>{unitTitle || 'Unit 1: Introducing the Hospitality Industry'}</Td></Tr>
        <Tr><Th>Deadline</Th><Td>{date}</Td><Th>Date Submitted</Th><Td>{date}</Td></Tr>
      </tbody>
    </Table>
    <Table>
      <thead>
        <Tr><Th>Targeted Criteria</Th><Th>Criteria achieved</Th><Th colSpan={2}>Assessment comments</Th></Tr>
      </thead>
      <tbody>
        {criteriaList.map((c, idx) => {
           const isPass = c.toUpperCase().startsWith('P');
           return (
             <Tr key={idx}>
               <Td>{c}</Td>
               <Td>{isPass ? 'Yes' : 'No'}</Td>
               <Td colSpan={2} className="h-10 text-[10px] leading-tight">
                 {getComment(learner.name, c, isPass)}
               </Td>
             </Tr>
           );
        })}
        <Tr><Th colSpan={4}>General comments</Th></Tr>
        <Tr><Td colSpan={4} className="h-16 text-[11px] italic">{getGeneralComment(learner.name, unitTitle || '')}</Td></Tr>
      </tbody>
    </Table>
    <Table>
      <tbody>
        <Tr><Th colSpan={2}>Learner Declaration</Th><Td className="text-xs">Learner signature: {learner.name}</Td><Td className="text-xs">Date: {date}</Td></Tr>
        <Tr><Th colSpan={2}>Assessor declaration</Th><Td className="text-xs">Assessor signature: {assessorName}</Td><Td className="text-xs">Date: {date}</Td></Tr>
      </tbody>
    </Table>
  </Page>
)};

// 4. IV Assessment Decisions
export const IVAssessmentDecisions: React.FC<TemplateProps> = ({ learner, allLearners, assessorName, verifierName, date, programmeTitle, unitTitle, assignmentTitle, criteria }) => {
  const awardedCriteria = (criteria || 'P1, P2').split(',').map(c => c.trim()).filter(c => c.toUpperCase().startsWith('P')).join(', ');
  const generalCommentsIV = [
    "Assessment decisions are fully accurate and criteria correctly applied.",
    "Clear tracking of evidence against pass criteria. Well done.",
    "Consistent grading aligned with the standard requirements.",
    "Good clear feedback has been provided to the learner.",
    "Assessments are fair, accurate, and properly verified."
  ];
  let hash = 0;
  const keyStr = (learner?.name || 'anon') + (unitTitle || '');
  for (let i = 0; i < keyStr.length; i++) hash = keyStr.charCodeAt(i) + ((hash << 5) - hash);
  const ivComment = generalCommentsIV[Math.abs(hash) % generalCommentsIV.length];

  const students = allLearners && allLearners.length > 0 ? allLearners : [learner];
  const emptyRowsNeeded = Math.max(0, 3 - students.length);

  return (
    <>
    <LandscapePage>
      <div className="flex flex-col h-full">
          <div className="flex justify-between items-end mb-4">
            <SectionTitle>Internal Verification – Assessment Decisions</SectionTitle>
            <div className="text-[#005c8a] font-bold text-xl flex items-center justify-end gap-2 mb-4">Pearson | BTEC</div>
          </div>
          <Table className="mb-2">
            <tbody>
              <Tr><Th className="w-1/4">Programme Title:</Th><Td colSpan={3}>{programmeTitle || 'BTEC International Level 2 Certificate in Hospitality'}</Td></Tr>
              <Tr><Th className="w-1/4">Unit/Component Number and Title:</Th><Td colSpan={3}>{unitTitle || 'Unit 1: Introducing the Hospitality Industry'}</Td></Tr>
              <Tr><Th className="w-1/4">Assessor Name:</Th><Td>{assessorName}</Td><Th className="w-1/4">Internal Verifier Name:</Th><Td>{verifierName}</Td></Tr>
              <Tr><Th className="w-1/4">Assignment title:</Th><Td colSpan={3}>{assignmentTitle || 'Exploring Hospitality'}</Td></Tr>
            </tbody>
          </Table>
          <Table className="mb-2">
            <thead>
              <Tr>
                <Th className="text-center w-[16%]">Name of Learner<br/><span className="text-[9px] font-normal leading-tight block mt-1">(If a larger sample is required, please add rows or use additional sheets)</span></Th>
                <Th className="text-center w-[14%]">Submission Type<br/><span className="text-[9px] font-normal leading-tight block mt-1">(First, Resubmission, Retake)</span></Th>
                <Th className="text-center w-[16%]">List which assessment and grading criteria the Assessor has awarded.<br/><span className="text-[9px] font-normal leading-tight block mt-1">Please state specific criteria and not an overall grade</span></Th>
                <Th className="text-center w-[10%]">Assessment Decision Accurate<br/><span className="text-[9px] font-normal leading-tight block mt-1">(Y/N)</span></Th>
                <Th className="text-center w-[22%]">List the assessment and grading criteria where inaccurate decisions have been made</Th>
                <Th className="text-center w-[22%]">State why the assessment decision is inaccurate.<br/><span className="text-[9px] font-normal leading-tight block mt-1">If an inaccurate decision is recorded the Internal Verifier must recommend actions detailing the issues...</span></Th>
              </Tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <Tr key={idx}>
                  <Td className="text-center h-12 font-semibold">{student.name}</Td>
                  <Td className="text-center text-xs">First</Td>
                  <Td className="text-center text-xs font-semibold">{awardedCriteria}</Td>
                  <Td className="text-center font-bold">Y</Td>
                  <Td className="text-center">-</Td>
                  <Td className="text-center">-</Td>
                </Tr>
              ))}
              {Array.from({ length: emptyRowsNeeded }).map((_, idx) => (
                <Tr key={`empty-${idx}`}><Td className="h-6"></Td><Td></Td><Td></Td><Td></Td><Td></Td><Td></Td></Tr>
              ))}
            </tbody>
          </Table>
          <Table className="mb-0">
            <tbody>
              <Tr>
                <Th className="bg-[#cbdce5]">INTERNAL VERIFIER CHECKLIST</Th>
                <Th className="text-center w-[10%] bg-[#cbdce5]">Y/N</Th>
              </Tr>
              <Tr>
                <Td className="font-semibold text-[#005c8a]">Has every learner and the Assessor confirmed the authenticity of the evidence? *</Td>
                <Td className="text-center font-bold">Y</Td>
              </Tr>
              <Tr>
                <Td className="font-semibold text-[#005c8a]">Is there evidence of collusion or plagiarism?</Td>
                <Td className="text-center font-bold">N</Td>
              </Tr>
              <Tr>
                <Td className="font-semibold text-[#005c8a]">
                  Does the assessment feedback to each learner:<br/>
                  <ul className="list-disc ml-5 font-normal text-slate-700 text-xs mt-1">
                     <li>Link to relevant assessment criteria?</li>
                     <li>Justify each assessment criterion awarded?</li>
                     <li>Provide appropriate guidance to the learner without giving specific actions for improvement?</li>
                  </ul>
                </Td>
                <Td className="text-center font-bold align-middle">Y</Td>
              </Tr>
              <Tr>
                <Th colSpan={2} className="bg-[#cbdce5]">GENERAL COMMENTS (if appropriate)</Th>
              </Tr>
              <Tr>
                <Td colSpan={2} className="h-10 italic text-sm">{ivComment}</Td>
              </Tr>
            </tbody>
          </Table>
          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 border-t border-slate-200 pt-2">
             <div>Author: VQAM<br/>Approver: VQAM Lead</div>
             <div>Page 1 of 2<br/>Public</div>
             <div className="text-right">Version: 2.3<br/>Date: 1 July 2024</div>
          </div>
      </div>
    </LandscapePage>

    <LandscapePage>
      <div className="flex flex-col h-full">
        <div className="flex justify-end mb-4">
           <div className="text-[#005c8a] font-bold text-xl flex items-center gap-2">Pearson | BTEC</div>
        </div>
        <Table className="mb-0">
          <tbody>
             <Tr><Th colSpan={3} className="bg-[#cbdce5] border-b-0">Any actions required must be reviewed across the whole cohort.</Th></Tr>
             <Tr>
               <Th className="w-[60%]">Action Required</Th>
               <Th className="w-[20%]">Target Date for Completion</Th>
               <Th className="w-[20%]">Date Action Completed</Th>
             </Tr>
             <Tr><Td className="h-8"></Td><Td></Td><Td></Td></Tr>
             <Tr><Td className="h-8"></Td><Td></Td><Td></Td></Tr>
             <Tr><Td className="h-8"></Td><Td></Td><Td></Td></Tr>
             <Tr><Td className="h-8"></Td><Td></Td><Td></Td></Tr>
          </tbody>
        </Table>
        <div className="bg-[#eef6fa] text-[#005c8a] font-semibold text-xs leading-relaxed p-3 border border-[#85bfe0] border-b-0 border-t-0">
           I confirm that the assessment decisions are accurate, there is no evidence of assessment malpractice and any action points have been addressed and completed in respect of the whole cohort.
        </div>
        <Table className="mb-2">
          <tbody>
             <Tr>
               <Th className="w-[30%]">Internal Verifier signature</Th>
               <Td className="font-semibold italic text-slate-700 w-[30%]">{verifierName}</Td>
               <Th className="w-[15%] text-center">Date</Th>
               <Td className="w-[25%] text-center">{date}</Td>
             </Tr>
             <Tr>
               <Th className="w-[30%]">Assessor signature</Th>
               <Td className="font-semibold italic text-slate-700 w-[30%]">{assessorName}</Td>
               <Th className="w-[15%] text-center">Date</Th>
               <Td className="w-[25%] text-center">{date}</Td>
             </Tr>
             <Tr>
               <Th className="w-[30%]">Lead Internal Verifier signature <span className="font-normal text-[10px] block">(if appropriate)</span></Th>
               <Td className="font-semibold italic text-slate-700 w-[30%]"></Td>
               <Th className="w-[15%] text-center">Date</Th>
               <Td className="w-[25%] text-center"></Td>
             </Tr>
          </tbody>
        </Table>
        <div className="text-[10px] text-[#005c8a] leading-tight p-2 bg-[#eef6fa] border border-[#85bfe0] italic mb-4">
          * Electronic signatures are acceptable on all assessment and internal verification documentation if there is an audit trail to support its authenticity. This includes a scanned signature or the individual's centre based email address. A font style is not accepted. Please see the Centre Guide to Internal Verification for further details.
        </div>
        
        <div className="flex justify-between items-center text-[10px] text-slate-500 mt-auto border-t border-slate-200 pt-2">
           <div>Author: VQAM<br/>Approver: VQAM Lead</div>
           <div>Page 2 of 2<br/>Public</div>
           <div className="text-right">Version: 2.3<br/>Date: 1 July 2024</div>
        </div>
      </div>
    </LandscapePage>
    </>
  );
};

// 5. Unit Assignment Cover
export const UnitAssignmentCover: React.FC<TemplateProps> = ({ learner, date, programmeTitle, unitTitle }) => (
  <Page>
    <div className="flex justify-start items-center gap-4 mb-10">
       <div className="w-16 h-4 bg-[#00a1e0]"></div>
       <div className="text-[#005c8a] font-bold text-xl flex items-center gap-2">Pearson <span className="font-light">Unit Assignment Cover</span></div>
    </div>
    <Table>
      <tbody>
        <Tr><Th className="w-1/3">LEARNER'S NAME</Th><Td>{learner.name}</Td></Tr>
        <Tr><Th className="w-1/3 bg-[#ccdce8]">REGISTRATION NO</Th><Td className="bg-[#eef2f5]">{learner.regNo}</Td></Tr>
        <Tr><Th className="w-1/3">SUBSITE (CODE)</Th><Td></Td></Tr>
        <Tr><Th className="w-1/3 bg-[#ccdce8]">PROGRAM TITLE & CODE</Th><Td className="bg-[#eef2f5] text-center font-semibold uppercase">{programmeTitle || 'PEARSON BTEC INTERNATIONAL LEVEL 2 CERTIFICATE IN HOSPITALITY'}</Td></Tr>
        <Tr><Th className="w-1/3">UNIT NO & TITLE (GLH)</Th><Td className="text-center font-semibold uppercase">{unitTitle || 'UNIT 1: INTRODUCING THE HOSPITALITY INDUSTRY'}</Td></Tr>
        <Tr><Th className="w-1/3 bg-[#ccdce8]">DATE ISSUED</Th><Td className="bg-[#eef2f5]"></Td></Tr>
        <Tr><Th className="w-1/3">FINAL DEADLINE</Th><Td></Td></Tr>
        <Tr><Th className="w-1/3 bg-[#ccdce8]">SUBMISSION DATE TO ASSESSOR</Th><Td className="bg-[#eef2f5]">{date}</Td></Tr>
      </tbody>
    </Table>
    <div className="text-center my-8 font-bold text-sm text-[#005c8a]">FOR THE USE OF LEAD INTERNAL VERIFIERS (LIV) ONLY:</div>
    <Table>
      <tbody>
        <Tr><Th className="w-1/3">SUBMISSION DATE TO LIV:</Th><Td colSpan={2}></Td></Tr>
        <Tr><Th className="w-1/3 bg-[#ccdce8]">CHECKED BY:</Th><Td className="bg-[#eef2f5] w-1/3"></Td><Td className="bg-[#ccdce8] w-1/3"></Td></Tr>
      </tbody>
    </Table>
  </Page>
);
