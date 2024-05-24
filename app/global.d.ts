declare global {
    interface Window {
      webkitSpeechRecognition: typeof SpeechRecognition;
    }
  
    var webkitSpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  
    interface SpeechRecognitionEvent extends Event {
      readonly resultIndex: number;
      readonly results: SpeechRecognitionResultList;
    }
  
    interface SpeechRecognitionResultList {
      [index: number]: SpeechRecognitionResult;
      readonly length: number;
    }
  
    interface SpeechRecognitionResult {
      readonly isFinal: boolean;
      [index: number]: SpeechRecognitionAlternative;
      readonly length: number;
    }
  
    interface SpeechRecognitionAlternative {
      readonly transcript: string;
      readonly confidence: number;
    }
  
    interface SpeechRecognition extends EventTarget {
      abort(): void;
      start(): void;
      stop(): void;
      readonly continuous: boolean;
      lang: string;
      readonly interimResults: boolean;
      maxAlternatives: number;
      onaudiostart: null | ((this: SpeechRecognition, ev: Event) => any);
      onaudioend: null | ((this: SpeechRecognition, ev: Event) => any);
      onend: null | ((this: SpeechRecognition, ev: Event) => any);
      onerror: null | ((this: SpeechRecognition, ev: Event) => any);
      onnomatch: null | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any);
      onresult: null | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any);
      onsoundstart: null | ((this: SpeechRecognition, ev: Event) => any);
      onsoundend: null | ((this: SpeechRecognition, ev: Event) => any);
      onspeechend: null | ((this: SpeechRecognition, ev: Event) => any);
      onstart: null | ((this: SpeechRecognition, ev: Event) => any);
    }
  }
  
  export {};
  