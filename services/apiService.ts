import axios from 'axios';

const API_BASE_URL = 'https://api.openai.com/v1';

// You need to set this in your environment or constants file
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY || '';

export const sendMessageToAI = async (message: string): Promise<string> => {
  try {
    if (!OPENAI_API_KEY) {
      return 'Please configure your OpenAI API key to use chat functionality.';
    }

    const response = await axios.post(
      `${API_BASE_URL}/chat/completions`,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a wise spiritual guide inspired by Lord Krishna and the Bhagavad Gita. Give practical life advice in simple modern language. Be calm, clear, and helpful. Keep responses to 150-200 words. Include a relevant Gita reference when appropriate.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 250,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return (
      response.data.choices[0]?.message?.content ||
      'I apologize, but I could not generate a response.'
    );
  } catch (error: any) {
    console.error('API Error:', error.message);
    if (error.response?.status === 401) {
      return 'API authentication failed. Please check your OpenAI API key.';
    }
    throw error;
  }
};

// Fallback mock responses for demo
export const sendMessageToAIMock = async (message: string): Promise<string> => {
  const lowercaseMessage = message.toLowerCase();

  const responses: { [key: string]: string } = {
    'feel lost': `The path to purpose is found not in the destination, but in performing your duty with full dedication.

As Krishna says in the Bhagavad Gita (2.47): "You have a right to perform your prescribed duty, but you are not entitled to the results of action."

Focus on what you can control today. Serve with your whole heart, and clarity will come naturally.`,

    'handle failure': `Failure is a teacher, not a verdict on your worth. Every great warrior has stumbled before victory.

Krishna teaches (2.27): "Death is certain for one who is born, and birth is certain for one who is dead; therefore, in the unavoidable cycle you should not grieve."

Learn the lesson, release the regret, and continue forward with renewed wisdom.`,

    'control anger': `Anger clouds judgment and binds us to suffering. Practice these steps:

1. Pause and breathe deeply
2. Step away from the situation
3. Remember your highest values
4. Respond with compassion

As Krishna guides (6.26): "For the mind which follows in the wake of the wandering senses will carry away his discriminative power."

Master your senses, master your peace.`,

    default: `Dear seeker, your question touches a truth that lies within you already.

The Bhagavad Gita teaches that we each have the power to shape our destiny through conscious choices and dedicated action.

What step can you take today? Start small, but start now. That is the path forward.🙏`,
  };

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  for (const [key, value] of Object.entries(responses)) {
    if (lowercaseMessage.includes(key)) {
      return value;
    }
  }

  return responses.default;
};
