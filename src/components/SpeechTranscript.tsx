import 'regenerator-runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';
import useClipboard from 'react-use-clipboard';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

const SpeechTranscript = () => {
  const [textToCopy, setTextToCopy] = useState('');
  const [isCopied, setCopied] = useClipboard(textToCopy);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const saveAsPdf = () => {
    if (transcript) {
      const pdf = new jsPDF();
      pdf.setFontSize(12);
      pdf.text(transcript, 15, 20);
      pdf.save("transcript.pdf");
    }
    setShowDropdown(false);
  };

  const saveAsTxt = () => {
    if (transcript) {
      const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, "transcript.txt");
    }
    setShowDropdown(false);
  };

  const saveAsDoc = () => {
    if (transcript) {
      const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, "transcript.docs");
    }
    setShowDropdown(false);
  };
  
  const listen = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  }
  const stopListen = () => {
    SpeechRecognition.stopListening();
  }

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();
  const transcriptContainerRef: any = useRef(null);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null
  }
  return (
    <div className="flex flex-col gap-3">
      <h5 className="mt-[10%] text-[#333] font-[600] text-[32px]">
        Speech To Text Converter
      </h5>
      <div
        className="py-[1%] px-[2%] ml-[22%] mr-[20%] rounded-sm border shadow-md h-[30%]"
        style={{ overflowY: 'scroll', maxHeight: '200px' }}
        ref={transcriptContainerRef}
        onClick={() => { setTextToCopy(transcript) }}
      >
        {transcript}
      </div>
      <div className="flex flex-row justify-evenly ml-[20%] mr-[19%] mt-[5%]">
        <div className="bg-[#5959dc] hover:bg-[#7272e0d8] text-[#fff] rounded-[8px] py-1 px-3 font-[600] text-[14px] cursor-pointer"
          onClick={setCopied}
        >
          Copy To ClipBoard
        </div>
        <div className="bg-[#5959dc] hover:bg-[#7272e0d8] text-[#fff] rounded-[8px] py-1 px-3 font-[600] text-[14px] cursor-pointer"
          onClick={listen}
        >
          Start Speaking
        </div>
        <div className="bg-[#5959dc] hover:bg-[#7272e0d8] text-[#fff] rounded-[8px] py-1 px-3 font-[600] text-[14px] cursor-pointer"
          onClick={stopListen}
        >
          Stop Speaking
        </div>
        <div className="bg-[#5959dc] hover:bg-[#7272e0d8] text-[#fff] rounded-[8px] py-1 px-7 font-[600] text-[14px] cursor-pointer"
          onClick={resetTranscript}
        >
          Reset
        </div>

        {/*  changes by vijay adding features save as pdf, docs, txt */}

        <div className="relative inline-block text-left">
          <div>
            <button type="button" onClick={toggleDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-200" id="options-menu" aria-haspopup="true" aria-expanded="true">
              Save As
              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-.707.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {showDropdown && (
            <div className="origin-top-right absolute right-0 mt-1 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="py-1" role="none">
                <button onClick={saveAsPdf} className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">PDF</button>
                <button onClick={saveAsDoc} className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">DOC</button>
                <button onClick={saveAsTxt} className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">TXT</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default SpeechTranscript