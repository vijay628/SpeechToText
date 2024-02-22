import 'regenerator-runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useEffect, useRef, useState } from 'react';
import useClipboard from 'react-use-clipboard';

const SpeechTranscript = () => {
  const [textToCopy,setTextToCopy] = useState('');
  const [,setCopied] = useClipboard(textToCopy);

  const listen = ()=>{
   SpeechRecognition.startListening({continuous: true, language: 'en-IN'});
  }
  const stopListen = ()=> {
   SpeechRecognition.stopListening();
  }
  
  const {transcript, browserSupportsSpeechRecognition, resetTranscript} = useSpeechRecognition();
  const transcriptContainerRef:any = useRef(null);

  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop = transcriptContainerRef.current.scrollHeight;
    }
  }, [transcript]);

  if(!browserSupportsSpeechRecognition){
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
        onClick={()=>{setTextToCopy(transcript)}}
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
       </div>
    </div>
  )
}

export default SpeechTranscript