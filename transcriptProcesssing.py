import requests

import cohere
import transcriptGenerator
'''
Input: textChunks from transcriptGenerator.py
Output: generatedSummary - String which contains the summary of the video fed into transcriptGenerator.py
alternatively, you can use outputList - contains the same content as generatedSummary but separated by Cohere Request # 

Sticking with Generate Function
Used Prompts: Note: Square Brackets [] mean optional/extra
    What are the main points of this [into bullet points]:
    Summarize this into bullet Points

Note: The Transcript Summary function on Cohere is very inaccurate
'''

# initialize the Cohere Client with an API Key
api_keys = ["5tF9d0IkQRph19apERAfxoudDUzmEnfyxo6pimfB", 
            "yRYJDINsAmmxz7y00xUfeAHAaUqjAO1c7XXLXzhv",
            "ivsDVDocsH8LnNhQ7b21PZURol6yr5x8UCVRwGdh"]
co = cohere.Client(api_keys[0])

transcript = ""
promptList = ["What are the main points of this in bullet points:", 
              "Summarize this into bullet points:"]

"""
For each sub-string, we need a prompt
co.generate Responses:
200 = ok
400 = bad request
498 = Blocked Input or Output
500 = Internal Server Errors
"""
outputList = []
count = 0
api_index = 0
maxCount = 5

for text in transcriptGenerator.textChunks:
    if(count < maxCount):
        cohere_response = co.generate(
                model='command-nightly',
                prompt= (promptList[0] + "\n\"" + text + "\""),
                max_tokens=4050,
                temperature=0.5)
        #if(cohere_response.response == 200):
        outputList = list(cohere_response.generations[0].text.split("\n"))
        outputList.remove(outputList[-1])
        outputList.remove(outputList[0])
        count += 1
        print("count")
    else:
        count = 0
        api_index += 1
        if(api_index >= len(api_keys)):
            print("BREAK ASAP")
            break
        else:
            co = cohere.Client(api_keys[api_index])
    #print(str(stuff))
    #else:
        #    print("ERROR")

#print(outputList)

#print(str(outputList))

generatedOutput = ""
for k in outputList:
    generatedOutput += k
    generatedOutput += "\n"

print(generatedOutput)
