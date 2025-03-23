import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface Milestone {
  title: string;
  dueDate: string;
  description: string;
  amount: number;
}

export interface ProjectProposal {
  projectTitle: string;
  projectDescription: string;
  milestones: Milestone[];
}

export async function generateProjectProposal(message: string): Promise<ProjectProposal> {
  try {
    // Define the schema for structured output
    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        projectTitle: {
          type: SchemaType.STRING,
          description: "The title of the project",
          nullable: false,
        },
        projectDescription: {
          type: SchemaType.STRING,
          description: "A detailed description of the project",
          nullable: false,
        },
        milestones: {
          type: SchemaType.ARRAY,
          description: "Array of project milestones",
          items: {
            type: SchemaType.OBJECT,
            properties: {
              title: {
                type: SchemaType.STRING,
                description: "The title of the milestone",
                nullable: false,
              },
              dueDate: {
                type: SchemaType.STRING,
                description: "The due date of the milestone in YYYY-MM-DD format",
                nullable: false,
              },
              description: {
                type: SchemaType.STRING,
                description: "A detailed description of the milestone",
                nullable: false,
              },
              amount: {
                type: SchemaType.NUMBER,
                description: "The budget amount for this milestone in USD",
                nullable: false,
              },
            },
            required: ["title", "dueDate", "description", "amount"],
          },
        },
      },
      required: ["projectTitle", "projectDescription", "milestones"],
    };

    // Configure the model with the schema
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema as any,
      },
    });

    // Create the prompt for the AI
    const prompt = `Based on the following message, generate a detailed project proposal:
    
    User message: ${message}
    Today's Date: ${new Date().toISOString()}

    Create a comprehensive project proposal with a clear title, detailed description, and at least 3-5 milestones.
    Each milestone should have a realistic title, due date, description, and budget amount.`;

    // Generate the content
    const result = await model.generateContent(prompt);
    
    // Parse the response
    const responseText = result.response.text();
    const proposal = JSON.parse(responseText) as ProjectProposal;
    
    return proposal;
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Failed to generate project proposal");
  }
}