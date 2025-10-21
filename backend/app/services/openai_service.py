import openai
import os
from typing import Optional
from datetime import datetime


class OpenAIService:
    def __init__(self):
        self.client = openai.OpenAI(
            api_key=os.getenv("OPENAI_API_KEY")
        )

    async def generate_response(self, message: str) -> str:
        """Generate AI response using OpenAI GPT"""
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful and friendly AI assistant. Provide clear, concise, and informative responses."},
                    {"role": "user", "content": message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content.strip()
        
        except Exception as e:
            raise Exception(f"Failed to generate AI response: {str(e)}")
    