from youtube_transcript_api import YouTubeTranscriptApi

#test2 = "https://www.youtube.com/watch?v=fLSQwA5gKT4&list=PLlwePzQY_wW8P_I8BFgm0-upywEwTKd8_&index=17"
test2 = "https://www.youtube.com/watch?v=r6sGWTCMz2k"
v_id_pos = test2.find("=")
end_id_pos = test2.find("&")
vid_id = []

#Get Video ID from URL
if(end_id_pos == -1):
    # no and sign, just remove LHS of url
    vid_id = test2[v_id_pos+1::]
else:
    vid_id = test2[v_id_pos+1:end_id_pos]

# get the transcript from Youtube API
response = YouTubeTranscriptApi.get_transcript(vid_id)
transcript = ""


#print(vid_length)
vid_length = (response[-1]['start'] + response[-1]['duration'])
maxRead = 5*60
intervals = vid_length / maxRead

amountRead = 0
numStrings = 0

strArray = []
#strArray.append
print(vid_id)

#set up strArray with blank strings
for k in range (int(intervals)+2):
    strArray.append('')

#print(response)
#iterate through the response dictionary to fill strArray with N min segments of text (N = maxRead)
for i in response:
    strArray[numStrings] += i["text"]
    strArray[numStrings] += " "
    amountRead += i["duration"]
    print(i["text"])

    if(amountRead >= maxRead):
        amountRead = 0
        numStrings += 1


#for j in strArray:

#print(response)
# fLSQwA5gKT4 
