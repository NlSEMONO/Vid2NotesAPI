import os
import json
from django.shortcuts import render
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

from notemaker.transcriptGenerator import *
from notemaker.transcriptProcesssing import *
from .models import *
from notemaker.export import *
from .NOTES import *

MIN_DOWNVOTES = 3

def temp(request):
    print(NOTES)
    return JsonResponse(NOTES, safe=False)

# Create your views here.
def get_notes(request):
    data = request.body.decode('utf-8')
    vid_link = request.GET['link']    

    notes = ['Continuity is', 'lorem ipsum']
    parsed_transcript = generate_transcript(vid_link)
    # print(len(parsed_transcript))
    # print('==================================\n\n')
    # print(parsed_transcript)
    # if len(parsed_transcript) == 2:
    #     print('==================================\n\n')
    #     print(parsed_transcript[-2])
    # print('==================================\n\n')
    # print(parsed_transcript[-1])
    if parsed_transcript == "":
        return JsonResponse([-1], safe=False)
    notes = process_transcriptV2(parsed_transcript, get_title(get_video_id(vid_link)), length=get_video_length(vid_link))
    # print('==================================\n\n')
    # print (notes)
    notes = notes.split('\n')
    print(notes)
    # # if len(notes) == 1:
    for i in range(len(notes)):
        notes[i] = notes[i].split('•')
    notes = [item for sublist in notes for item in sublist]
    # for i in range(len(notes)):
    #     notes[i] = notes[i].split(' -')
    # notes = [item for sublist in notes for item in sublist]

    for i in range(len(notes)):
        notes[i] = notes[i].strip()
        str_so_far = ''
        for j in range(len(notes[i])):
            if notes[i][j] not in {'$', '{', '}'}:
                str_so_far += notes[i][j]
        notes[i] = str_so_far

    notes_to_send = []
    for item in notes:
        if item != '':
            notes_to_send.append(item)

    return JsonResponse(notes_to_send, safe=False)

@csrf_exempt
def fill_in_the_blanks(request):
    data = request.body.decode('utf-8')
    data = json.loads(data)

    notes = data['notes']
    print(notes)
    defs = [note for note in notes if len(note) <= 500]
    print(defs)
    questions = process_transcriptV2(defs, 'XD!', type=2).split('\n')[:-1]
    error = '*()&*68234'
    q_to_send = []
    a_to_send = []
    for i in range(min(len(questions), len(defs))):
        if questions[i] != error:
            q_to_send.append(questions[i])
            a_to_send.append(defs[i])
    print(q_to_send)
    return JsonResponse({'questions': q_to_send, 'answers': a_to_send}, safe=False)

@csrf_exempt
def reaction(request):
    data = request.body.decode('utf-8')
    data = json.loads(data)

    vid_id = get_video_id(data['video'])

    if data['sentiment'] == 'good' and len(FileName.objects.filter(name=vid_id)) == 0:
        file = FileName.objects.get(name=vid_id, thumbs_up=0, thumbs_down=0)
        file.save_pdf(data['notes'], f"{vid_id}.pdf")
        file.thumbs_up += 1
        file.save()
    elif data['sentiment'] == 'good': 
        file = FileName.objects.get(name=vid_id)
        file.thumbs_up += 1
        file.save()
    else:
        if len(FileName.objects.filter(name=vid_id)) > 0:
            file = FileName.objects.get(name=vid_id)
            file.thumbs_down += 1
            file.save()
            if file.thumbs_down >= MIN_DOWNVOTES and file.thumbs_up < file.thumbs_down:
                file.delete()
                os.remove(f"{vid_id}.pdf")

        req = HttpRequest()
        req.method = 'GET'
        req.META = request.meta
        req.GET['link'] = data['video']
        return get_notes(req)

    return JsonResponse({'success': True})

def get_pdf(request):
    return JsonResponse({'success': True})