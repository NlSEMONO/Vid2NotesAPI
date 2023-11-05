"""
Input: URL - YouTube URL as a String
Output: textChunks - a list of strings
Take in a URL input, process and generate the transcript output, divided into approximately 5 min chunks
"""
from youtube_transcript_api import YouTubeTranscriptApi

#test_URL = "https://www.youtube.com/watch?v=fLSQwA5gKT4&list=PLlwePzQY_wW8P_I8BFgm0-upywEwTKd8_&index=17" #Calc Continuity Lecture
#test_URL = "https://www.youtube.com/watch?v=r6sGWTCMz2k" #3Blue1Brown Fourier Series
test_URL = "https://www.youtube.com/watch?v=9k97m8oWnaY" #Calc 3 Surface Integrals
#test_URL = "https://www.youtube.com/watch?v=WCwJNnx36Rk" #Ben Eater Bi-Stable 555 circuit video
#test_URL = "https://www.youtube.com/watch?v=kRlSFm519Bo" #Ben Eater Astable 555 circuit video

def generate_transcript(url):
    v_id_pos = url.find("=")
    end_id_pos = url.find("&")
    vid_id = []

    #Get Video ID from url
    if(end_id_pos == -1):
        # no and sign, just remove LHS of url
        vid_id = url[v_id_pos+1::]
    else:
        vid_id = url[v_id_pos+1:end_id_pos]

    # get the transcript from Youtube API
    response = YouTubeTranscriptApi.get_transcript(vid_id)
    #print(response)

    textChunks = []
    maxRead = 3*60
    time = 0
    slot = 0

    textChunks.append("")

    """
    response gives a list of dictionary as follows
    text: string
    start: float (in seconds)
    duration: float (in seconds)
    we want to read and store our transcript into 5 minute chunks
    """
    for dict in response:
        if(time >= maxRead):
            # when we have read 5ish minutes, make a new entry into textChunks
            time = 0
            slot += 1
            textChunks.append("")
            #print("new")
        else:
            # write the transcript segment into the current textChunks slot
            transcriptClip = dict["text"] + " "
            textChunks[slot] += transcriptClip
            time += dict["duration"]
    
    #print(textChunks[-1])
    #print(slot)
    #print(len(textChunks))
    #print(textChunks[-1])
    return textChunks
        
        
"""
Debug:

"""
testOut = generate_transcript(test_URL)
#print(testOut)