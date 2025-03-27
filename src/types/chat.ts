// types/chat.ts
export interface ChatMessage {
    text: string;
    user: string;
    timestamp: string;
    action?: string;
  }
  
  export interface ApiRequestPayload {
    text: string;
    userId: string;
    userName: string;
  }
  
  export interface ApiResponseMessage {
    user: string;
    text: string;
    action?: string;
  }
  
  