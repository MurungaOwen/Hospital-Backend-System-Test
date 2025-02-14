import { GoogleGenerativeAI } from '@google/generative-ai';
import "dotenv/config";

export class LLMService {
    private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    
    static async extractActionableSteps(content: string): Promise<{ checklist: string[]; plan: {action: string, frequency: string}[] }> {
        const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const prompt = `
                Extract actionable steps from the following doctor's note. Divide them into two categories:
                1. **Checklist**: Urgent or one-time tasks that must be done immediately.
                2. **Plan**: Scheduled or recurring actions for long-term care.

                ### **Example**
                **Doctor's Note:**  
                Patient should buy paracetamol and drink water frequently. Exercise 3 times a week and avoid fast food.

                **Expected JSON Output:**
                \`\`\`json
                {
                "checklist": ["Buy paracetamol"],
                "plan": [
                    { "action": "Drink water frequently", "frequency": "daily" },
                    { "action": "Exercise", "frequency": "3 times a week" },
                    { "action": "Avoid fast food", "frequency": "ongoing" }
                ]
                }
                \`\`\`

                ### **Your Turn**
                Now, extract actionable steps from this note:

                **Doctor's Note:**  
                ${content}

                **Important:**
                - DO NOT return an empty checklist or plan *required and important*.
                - If no clear instructions exist, infer reasonable health actions.
                - Return only valid JSON without markdown, extra text, or explanations.
                `
            ;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response.text();

            // Extract JSON safely using regex (removes extra text if present)
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No valid JSON found in LLM response");

            const parsedResponse = JSON.parse(jsonMatch[0]);
            console.log("Parsed AI Response:", parsedResponse);
            return parsedResponse;
        } catch (error) {
            console.error("Error processing LLM response:", error);
            throw new Error('Failed to parse LLM response');
        }
    }
}