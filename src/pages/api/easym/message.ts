/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from 'next';

interface ChatMessage {
  user?: string;
  text: string;
  action?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text, userId, userName } = req.body;
    // In a real application, you could call your AI service here.
    // For now, return a static example response.
    const response: ChatMessage[] = [
      {
        user: "EasyMererer",
        text:
          "here's your latest loan info and transactions from fusion. if there's anything else you need, just let me know!",
        action: "CHECK_LOAN",
      },
      {
        text: `Hello ${userName},

Here's a detailed overview of your active Grind Loan:

- Principal Amount: ₦300.00
- Interest Rate: 5% (flat rate)
- Interest Amount: ₦75.00
- Approval Date: October 13, 2024
- Disbursement Date: October 13, 2024
- Maturity Date: March 14, 2025
- Repayment Cycle: Monthly over 5 months

You've repaid a total of ₦175.00 so far, leaving a balance of ₦125.00. The administrative charge was ₦30.24 and the form fee was ₦100.00, both paid upfront.

If you need further assistance or have questions about your repayments, feel free to reach out!

Warm regards, 
EasyM from TechFusion Africa`,
      },
    ];
    return res.status(200).json(response);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
