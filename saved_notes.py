import csv

#quick and slow csv implementation for now
def save_note(label:str, text_to_save:str):
    with open("saves_notes.csv", 'a') as f:
        fwriter = csv.writer(f)
        fwriter.writerow([label, text_to_save])

def get_text(label:str):
    with open("saves_notes.csv", 'r') as f:
        freader = csv.reader(f)
        for row in freader:
            if row[0] == label:
                return row[1]