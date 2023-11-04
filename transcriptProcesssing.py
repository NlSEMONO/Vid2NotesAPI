import requests

import cohere
import transcriptGenerator
'''
Sticking with Generate Function
Used Prompts: Note: Square Brackets [] mean optional/extra
What are the main points of this [into bullet points]:
Summarize this into bullet Points

Note: The Transcript Summary function on Cohere is very inaccurate
'''

# initialize the Cohere Client with an API Key
co = cohere.Client('yRYJDINsAmmxz7y00xUfeAHAaUqjAO1c7XXLXzhv')

transcript = ""
prompt = 

# generate a prediction for a prompt
prediction = co.generate(
            model='command-nightly',
            prompt='co:here',
            max_tokens=10)

# print the predicted text
print('prediction: {}'.format(prediction.generations[0].text))