// utils/api.ts

import { ApiRequestPayload, ApiResponseMessage } from "@/types/chat";

  
export async function sendChatMessage(payload: ApiRequestPayload): Promise<ApiResponseMessage[]> {
  try {
    const response = await fetch('https://64f6-2c0f-2a80-a31-eb10-c3-d9e6-60d9-f326.ngrok-free.app/easym/message', {
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
    console.error('Error sending message to API:', error);
    throw error;
  }
}