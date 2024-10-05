import { VscUnmute } from "react-icons/vsc";


export default function Sound({ text }: { text:string }) {
    const Sound =()=>{
        const voice = new SpeechSynthesisUtterance();
        voice.text = text;
        voice.lang = 'en-US';
        voice.rate = 1;

        speechSynthesis.speak(voice);
    }


    return(
        <button className="bg-amber-200 p-1 rounded-full text-gray-600" onClick={Sound}>
            <VscUnmute size={20} />
        </button>
    );
}
