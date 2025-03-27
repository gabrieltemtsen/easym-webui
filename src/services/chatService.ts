// services/chatService.ts
import { ApiRequestPayload, ApiResponseMessage } from '../types/chat';

class ChatService {
  private apiUrl: string;
  
  constructor(apiUrl: string = 'http://localhost:4000/easym/message') {
    this.apiUrl = apiUrl;
  }
  
  async sendMessage(
    text: string, 
    userId: string = 'KUSHI', 
    userName: string = 'Sammy'
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