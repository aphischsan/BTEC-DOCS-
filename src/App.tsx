import { useState } from 'react';
import { Calendar, Users, FileText, Plus, Trash2, FileCheck2, BookOpen, ArrowLeft, Download, Loader2, Database } from 'lucide-react';
import { IVAssignmentBrief, RecordOfPracticalActivity, AssessmentRecord, IVAssessmentDecisions, UnitAssignmentCover } from './components/Templates';
import { btecUnits } from './data/units';

interface Learner {
  id: string;
  name: string;
  regNo: string;
}

export default function App() {
  const [assessorName, setAssessorName] = useState('');
  const [verifierName, setVerifierName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dateIssued, setDateIssued] = useState('');
  const [deadline, setDeadline] = useState('');
  const [finalDeadline, setFinalDeadline] = useState('');
  const [showPrintWarning, setShowPrintWarning] = useState<boolean>(false);

  const handleExportPDF = () => {
    try {
      if (window.self !== window.top) {
        setShowPrintWarning(true);
        setTimeout(() => setShowPrintWarning(false), 10000);
      } else {
        window.print();
      }
    } catch (e) {
      setShowPrintWarning(true);
      setTimeout(() => setShowPrintWarning(false), 10000);
    }
  };
  
  const [learners, setLearners] = useState<Learner[]>([
    { id: '1', name: '', regNo: '' },
    { id: '2', name: '', regNo: '' },
    { id: '3', name: '', regNo: '' },
    { id: '4', name: '', regNo: '' },
    { id: '5', name: '', regNo: '' },
    { id: '6', name: '', regNo: '' },
    { id: '7', name: '', regNo: '' },
  ]);

  const [selectedDocType, setSelectedDocType] = useState('all');
  const [selectedUnitId, setSelectedUnitId] = useState(btecUnits[0].id);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedLearnerPreview, setSelectedLearnerPreview] = useState<string | null>(null);

  const activeUnit = btecUnits.find(u => u.id === selectedUnitId) || btecUnits[0];

  const addLearner = () => {
    if (learners.length < 15) {
      setLearners([...learners, { id: crypto.randomUUID(), name: '', regNo: '' }]);
    }
  };

  const removeLearner = (id: string) => {
    setLearners(learners.filter(l => l.id !== id));
  };

  const updateLearner = (id: string, field: keyof Learner, value: string) => {
    setLearners(learners.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const generatePortfolios = () => {
    setIsGenerating(true);
    // Simulate generation time (parsing PDF and filling templates)
    setTimeout(() => {
      setIsGenerating(false);
      setShowPreview(true);
      if (learners.length > 0) {
        setSelectedLearnerPreview(learners[0].id);
      }
    }, 2000);
  };

  const activeLearner = learners.find(l => l.id === selectedLearnerPreview);
  const isReadyToGenerate = learners.some(l => l.name && l.regNo) && assessorName && verifierName;

  if (showPreview && activeLearner) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans print:bg-white">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sticky top-0 z-50 print:hidden">
          <div className="flex items-center gap-4 text-center sm:text-left">
             <button 
               onClick={() => setShowPreview(false)}
               className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
             >
               <ArrowLeft className="w-5 h-5" />
             </button>
             <div>
               <h1 className="text-xl font-bold text-slate-900">Generated Portfolios</h1>
               <p className="text-sm text-slate-500">Previewing BTEC Unit Documentation</p>
             </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
             <select 
               className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
               value={selectedDocType}
               onChange={(e) => setSelectedDocType(e.target.value)}
             >
               <option value="all">All Documents</option>
               <option value="iv_brief">Internal Verification Assignment Brief</option>
               <option value="practical">BTEC Record of Practical Activity</option>
               <option value="assessment">Assessment Record</option>
               <option value="iv_decisions">IV Assessment Decisions</option>
               <option value="cover">Unit Assignment Cover</option>
             </select>

             <select 
               className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
               value={selectedLearnerPreview || ''}
               onChange={(e) => setSelectedLearnerPreview(e.target.value)}
             >
               {learners.filter(l => l.name).map((l, i) => (
                 <option key={l.id} value={l.id}>{i + 1}. {l.name} ({l.regNo})</option>
               ))}
             </select>
             <button 
               className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors w-full sm:w-auto"
               onClick={handleExportPDF}
             >
               <Download className="w-4 h-4" />
               <span>Export PDF</span>
             </button>
          </div>
        </header>
        
        <main className="flex-grow overflow-auto p-4 sm:p-8 flex flex-col items-center print:p-0 print:m-0 relative">
           
           {showPrintWarning && (
             <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-100 border border-amber-300 text-amber-900 px-6 py-4 rounded-lg shadow-lg z-50 max-w-lg w-[calc(100%-2rem)] flex gap-3 text-sm animate-in fade-in slide-in-from-top-4 print:hidden">
               <div className="shrink-0 flex items-center justify-center pt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
               </div>
               <div>
                 <p className="font-bold mb-1">Printing is restricted in preview</p>
                 <p>Because you are viewing this app within an embedded preview, your browser blocks the print dialog. To export to PDF, please click the "<b>Open in new tab</b>" icon at the top right of the whole page, and then click Export PDF there.</p>
               </div>
             </div>
           )}

           <div className="w-full max-w-[210mm] print:max-w-none">
             <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 mb-8 text-sm flex gap-3 print:hidden">
                <FileCheck2 className="w-5 h-5 shrink-0 text-blue-600" />
                <div>
                   <p className="font-bold mb-1">Templates auto-filled successfully</p>
                   <p>The system has extracted data from memory and generated standard BTEC forms for <strong>{activeLearner.name}</strong>. Print or export them as a single PDF.</p>
                </div>
             </div>

             <div className="generated-documents print:m-0 print:p-0">
               {(selectedDocType === 'all' || selectedDocType === 'iv_brief') && <IVAssignmentBrief learner={activeLearner} assessorName={assessorName} verifierName={verifierName} date={date} dateIssued={dateIssued} deadline={deadline} finalDeadline={finalDeadline} unitTitle={activeUnit.title} assignmentTitle={activeUnit.assignmentTitle} criteria={activeUnit.criteria} />}
               {(selectedDocType === 'all' || selectedDocType === 'practical') && <RecordOfPracticalActivity learner={activeLearner} assessorName={assessorName} verifierName={verifierName} date={date} dateIssued={dateIssued} deadline={deadline} finalDeadline={finalDeadline} unitTitle={activeUnit.title} assignmentTitle={activeUnit.assignmentTitle} criteria={activeUnit.criteria} practicalCriteria={activeUnit.practicalCriteria} />}
               {(selectedDocType === 'all' || selectedDocType === 'assessment') && <AssessmentRecord learner={activeLearner} assessorName={assessorName} verifierName={verifierName} date={date} dateIssued={dateIssued} deadline={deadline} finalDeadline={finalDeadline} unitTitle={activeUnit.title} assignmentTitle={activeUnit.assignmentTitle} criteria={activeUnit.criteria} />}
               {(selectedDocType === 'all' || selectedDocType === 'iv_decisions') && <IVAssessmentDecisions learner={activeLearner} allLearners={learners.filter(l => l.name)} assessorName={assessorName} verifierName={verifierName} date={date} dateIssued={dateIssued} deadline={deadline} finalDeadline={finalDeadline} unitTitle={activeUnit.title} assignmentTitle={activeUnit.assignmentTitle} criteria={activeUnit.criteria} />}
               {(selectedDocType === 'all' || selectedDocType === 'cover') && <UnitAssignmentCover learner={activeLearner} assessorName={assessorName} verifierName={verifierName} date={date} dateIssued={dateIssued} deadline={deadline} finalDeadline={finalDeadline} unitTitle={activeUnit.title} assignmentTitle={activeUnit.assignmentTitle} criteria={activeUnit.criteria} />}
             </div>
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 font-sans flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full flex-grow flex flex-col">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-2 sm:gap-3">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
              Hospitality Portfolio Automator
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500 font-medium">
              BTEC Level 2/3 Unit Documentation Engine
            </p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm w-full md:w-auto">
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">System Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${learners.length > 0 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                <span className="text-sm font-semibold text-slate-700">Active Sessions: {learners.length < 10 ? `0${learners.length}` : learners.length} Learners</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow">
          {/* 1. Administration Details */}
          <div className="lg:col-span-4 lg:row-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">1. Administration Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Assessor Name</label>
                <input 
                  type="text" 
                  value={assessorName}
                  onChange={(e) => setAssessorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  placeholder="e.g., John Doe"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Internal Verifier</label>
                <input 
                  type="text" 
                  value={verifierName}
                  onChange={(e) => setVerifierName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                  placeholder="Enter IV Name..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Date Issued</label>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="date" 
                      value={dateIssued}
                      onChange={(e) => setDateIssued(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow disabled:opacity-50"
                      disabled={dateIssued === ''}
                    />
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        id="leaveDateIssuedBlank"
                        checked={dateIssued === ''}
                        onChange={(e) => setDateIssued(e.target.checked ? '' : new Date().toISOString().split('T')[0])}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-3 h-3"
                      />
                      <label htmlFor="leaveDateIssuedBlank" className="text-[10px] text-slate-600 cursor-pointer select-none">
                        Manual entry
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deadline / Formative</label>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="date" 
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow disabled:opacity-50"
                      disabled={deadline === ''}
                    />
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        id="leaveDeadlineBlank"
                        checked={deadline === ''}
                        onChange={(e) => setDeadline(e.target.checked ? '' : new Date().toISOString().split('T')[0])}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-3 h-3"
                      />
                      <label htmlFor="leaveDeadlineBlank" className="text-[10px] text-slate-600 cursor-pointer select-none">
                        Manual entry
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Final Deadline</label>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="date" 
                      value={finalDeadline}
                      onChange={(e) => setFinalDeadline(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow disabled:opacity-50"
                      disabled={finalDeadline === ''}
                    />
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        id="leaveFinalDeadlineBlank"
                        checked={finalDeadline === ''}
                        onChange={(e) => setFinalDeadline(e.target.checked ? '' : new Date().toISOString().split('T')[0])}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-3 h-3"
                      />
                      <label htmlFor="leaveFinalDeadlineBlank" className="text-[10px] text-slate-600 cursor-pointer select-none">
                        Manual entry
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Submission / Assessment</label>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-[10px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow disabled:opacity-50"
                      disabled={date === ''}
                    />
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="checkbox" 
                        id="leaveDateBlank"
                        checked={date === ''}
                        onChange={(e) => setDate(e.target.checked ? '' : new Date().toISOString().split('T')[0])}
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer w-3 h-3"
                      />
                      <label htmlFor="leaveDateBlank" className="text-[10px] text-slate-600 cursor-pointer select-none">
                        Manual entry
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Documentation Settings */}
          <div className="lg:col-span-8 lg:row-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-center">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">2. Documentation Settings</h2>
            <div className="flex-grow flex flex-col justify-center gap-4 max-w-2xl">
               <div>
                 <label className="block text-[11px] font-bold text-slate-600 mb-2">Select Target Unit</label>
                 <select 
                   value={selectedUnitId}
                   onChange={(e) => setSelectedUnitId(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 transition-shadow"
                 >
                   {btecUnits.map(u => (
                     <option key={u.id} value={u.id}>{u.title}</option>
                   ))}
                 </select>
               </div>
               <div>
                 <label className="block text-[11px] font-bold text-slate-600 mb-2">Select Target Document</label>
                 <select 
                   value={selectedDocType}
                   onChange={(e) => setSelectedDocType(e.target.value)}
                   className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 transition-shadow"
                 >
                   <option value="all">Complete Portfolio (All 5 Documents)</option>
                   <option value="iv_brief">Internal Verification Assignment Brief</option>
                   <option value="practical">BTEC Record of Practical Activity</option>
                   <option value="assessment">Assessment Record</option>
                   <option value="iv_decisions">Internal Verification - Assessment Decisions</option>
                   <option value="cover">Unit Assignment Cover</option>
                 </select>
               </div>
               <p className="text-xs text-slate-500 flex items-center gap-2">
                 <FileText className="w-4 h-4 text-indigo-400" />
                 Currently selected template format and unit data will be generated for all configured learners.
               </p>
            </div>
          </div>

          {/* 4. Action / Details  */}
          <div className="lg:col-span-4 lg:row-span-4 flex flex-col gap-4">
            <div className="bg-indigo-900 text-white rounded-2xl p-6 flex flex-col justify-between flex-grow">
              <div className="h-full flex flex-col">
                <h2 className="text-xs uppercase tracking-widest text-indigo-300 font-bold mb-4">4. Built-in Data Engine</h2>
                <div className="border-2 border-dashed border-indigo-500/80 bg-indigo-800/30 rounded-xl p-6 flex flex-col items-center justify-center text-center flex-grow gap-4">
                   <div className="flex justify-center items-center gap-3">
                      <div className="p-3 bg-indigo-800 rounded-full shadow-inner">
                        <Database className="w-8 h-8 text-indigo-300" />
                      </div>
                   </div>
                   <div>
                     <p className="text-sm font-semibold tracking-wide">BTEC Spec Engine Active</p>
                     <p className="text-[11px] text-indigo-300 mt-2 leading-relaxed">
                       Reference templates and source PDFs are hardcoded and loaded in memory. Upload is not required, preserving data persistence.
                     </p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex-grow flex flex-col justify-center items-center text-center">
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Output Generation</p>
                <div className="w-24 h-32 bg-slate-50 border border-slate-100 rounded shadow-inner flex flex-col items-center justify-center gap-1.5 p-2 mb-2 relative overflow-hidden">
                  {isGenerating ? (
                    <div className="absolute inset-0 bg-indigo-50/80 flex items-center justify-center">
                       <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                    </div>
                  ) : (
                    <>
                      <div className="h-1 bg-slate-200 w-full rounded"></div>
                      <div className="h-1 bg-slate-200 w-3/4 rounded self-start"></div>
                      <div className="h-1 bg-slate-200 w-1/2 rounded self-start"></div>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={generatePortfolios}
                disabled={!isReadyToGenerate || isGenerating}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-sm shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:active:scale-100"
              >
                {isGenerating ? 'ANALYZING & GENERATING...' : 'GENERATE PORTFOLIOS'}
              </button>
              <p className="mt-3 text-[10px] text-slate-400 font-medium italic px-2">
                Requires Assessor & Verifier names and at least 1 completed learner.
              </p>
            </div>
          </div>

          {/* 3. Learner Registry */}
          <div className="lg:col-span-8 lg:row-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col">
            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-4">3. Learner Registry (Capacity: {learners.length < 10 ? `0${learners.length}` : learners.length} / 15)</h2>
            <div className="flex-grow overflow-auto min-h-[300px]">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white z-10 border-b border-slate-100">
                  <tr>
                    <th className="py-2 text-[11px] font-bold text-slate-500 w-8 sm:w-12">No.</th>
                    <th className="py-2 text-[11px] font-bold text-slate-500">Full Learner Name</th>
                    <th className="py-2 text-[11px] font-bold text-slate-500">Registration ID</th>
                    <th className="py-2 text-[11px] font-bold text-slate-500 w-20 sm:w-24 px-2">Status</th>
                    <th className="py-2 text-[11px] font-bold text-slate-500 w-10"></th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700 divide-y divide-slate-50">
                  {learners.map((learner, index) => (
                    <tr key={learner.id} className="group">
                      <td className="py-2 text-slate-400 text-xs font-semibold">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </td>
                      <td className="py-2 pr-2 sm:pr-4">
                        <input 
                          type="text" 
                          value={learner.name}
                          onChange={(e) => updateLearner(learner.id, 'name', e.target.value)}
                          placeholder="Learner Name"
                          className="w-full bg-transparent border-none outline-none font-semibold text-slate-900 placeholder:text-slate-300 placeholder:font-normal focus:bg-slate-50 rounded px-2 -ml-2 py-1.5 transition-colors"
                        />
                      </td>
                      <td className="py-2 pr-2 sm:pr-4">
                        <input 
                          type="text" 
                          value={learner.regNo}
                          onChange={(e) => updateLearner(learner.id, 'regNo', e.target.value)}
                          placeholder="B21-HOSP-XXXX"
                          className="w-full bg-transparent border-none outline-none font-mono text-xs text-slate-600 placeholder:text-slate-300 focus:bg-slate-50 rounded px-2 -ml-2 py-1.5 transition-colors"
                        />
                      </td>
                      <td className="py-2 px-2">
                         <span className={`text-[10px] px-2 py-1 rounded-full uppercase font-bold tracking-wider ${(learner.name && learner.regNo) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                           {(learner.name && learner.regNo) ? 'Ready' : 'Pending'}
                         </span>
                      </td>
                      <td className="py-2 text-right">
                        <button 
                          onClick={() => removeLearner(learner.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Remove learner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {learners.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400 text-sm font-medium italic">
                        No learners in registry.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 text-center transition-colors hover:bg-slate-100/80">
              <button 
                onClick={addLearner}
                disabled={learners.length >= 15}
                className="text-xs uppercase tracking-wider font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed w-full h-full"
              >
                + Add New Learner (Up to 15 max)
              </button>
            </div>
          </div>
        </div>

        <footer className="mt-8 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-bold pb-2">
          <p>© {new Date().getFullYear()} BTEC Documentation Engine</p>
          <div className="flex gap-4">
            <span className="hidden sm:inline">Version 2.4.0 (Stable)</span>
            <span className="text-emerald-500 flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Virtual Engine Active
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
