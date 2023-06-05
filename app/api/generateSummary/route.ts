import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function POST(request: Request) {
  //todos in the body of the POST request
  const { todos } = await request.json();
  try {
    // communicate with openAI GPT
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: 'system',
          content: `When responding, welcome the user always as Mr.Kazeem and say welcome to Dark Ace Trello clone! Limit the response to 200 Characters.`,
        },
        {
          role: 'user',
          content: `Hi there, provide a summary of the following todo. Count how many todos are in each category such as Todo, In Progress and Done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
            todos
          )}`,
        },
      ],
    });

    const { data } = response;
    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    // mimic response expected by calling function
    return NextResponse.json({
      content: 'GPT is summarising your tasks for the day...',
    });
  }
}
