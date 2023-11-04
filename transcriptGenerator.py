from youtube_transcript_api import YouTubeTranscriptApi

#URL = "https://www.youtube.com/watch?v=fLSQwA5gKT4&list=PLlwePzQY_wW8P_I8BFgm0-upywEwTKd8_&index=17"
URL = "https://www.youtube.com/watch?v=r6sGWTCMz2k"
v_id_pos = URL.find("=")
end_id_pos = URL.find("&")
vid_id = []

#Get Video ID from URL
if(end_id_pos == -1):
    # no and sign, just remove LHS of url
    vid_id = URL[v_id_pos+1::]
else:
    vid_id = URL[v_id_pos+1:end_id_pos]

# get the transcript from Youtube API
response = YouTubeTranscriptApi.get_transcript(vid_id)
#transcript = ""


#print(vid_length)
vid_length = (response[-1]['start'] + response[-1]['duration'])
maxRead = 5*60
num_intervals = vid_length / maxRead

amountRead = 0
numStrings = 0

textChunks = []
#strArray.append
#print(vid_id)

#set up strArray with blank strings
for k in range (int(num_intervals)+2):
    textChunks.append('')

#print(response)
#iterate through the response dictionary to fill strArray with N min segments of text (N = maxRead)
for i in response:
    textChunks[numStrings] += i["text"]
    textChunks[numStrings] += " "
    amountRead += i["duration"]
    #print(i["text"])

    if(amountRead >= maxRead):
        amountRead = 0
        numStrings += 1
        

#print("\"" + textChunks[0] + "\"")

#for j in strArray:

#print(response)
# fLSQwA5gKT4 
