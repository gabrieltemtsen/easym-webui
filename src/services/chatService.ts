// services/chatService.ts
import { ApiRequestPayload, ApiResponseMessage } from '../types/chat';

class ChatService {
  private apiUrl: string;
  
  constructor(apiUrl: string = 'https://64f6-2c0f-2a80-a31-eb10-c3-d9e6-60d9-f326.ngrok-free.app/easym/message') {
    this.apiUrl = apiUrl;
  }
  
  async sendMessage(
    text: string, 
    userId: string = 'matt123', 
    userName: string = 'Matt'
  ): Promise<ApiResponseMessage[]> {
    try {
      const payload: ApiRequestPayload = {
        text,
        userId,
        userName,
      };
      
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
  
  // Additional method to customize API URL if needed
  setApiUrl(url: string): void {
    this.apiUrl = url;
  }
  
  // Add user configuration
  setUserDefaults(userId: string, userName: string): void {
    this.defaultUserId = userId;
    this.defaultUserName = userName;
  }
  
  // Private properties for default user info
  private defaultUserId: string = 'KUSHI';
  private defaultUserName: string = 'Sammy';
}

// Create and export a singleton instance
const chatService = new ChatService();
export default chatService;