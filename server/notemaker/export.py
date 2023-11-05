import subprocess
from sys import platform
from fpdf import FPDF

def save_pdf(text_to_export:str, output_location:str):
    """Include .pdf in output location"""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('helvetica', size=12)
    pdf.cell(text=text_to_export)
    pdf.output(output_location)

# Bad code below
# def main(text_to_export: str, output_location: str):
#     """Precondition: output_location must not include file extension
#     overwrites older file if it exists"""
#     #windows not yet supported
#     new_text = text_to_export.replace("\n", '</text:p><text:p text:style-name="P1"')
#
#     with open("notes_folder/content.xml", 'r') as f:
#         file_text = f.read()
#         f.close()
#     file_text = file_text.replace("Gap to help find", new_text)
#     with open("notes_folder/content.xml", 'w') as f:
#         f.write(file_text)
#         f.close()
#
#     #remove older file if it exists
#     subprocess.run(["rm", output_location + ".zip"])
#
#     if platform == 'linux':
#         out = subprocess.run(["zip", "-0", output_location + ".zip", "notes_folder/"])
#
#     #cleanup
#     with open("notes_folder/content.xml", 'r') as f:
#         file_text = f.read()
#         f.close()
#     file_text.replace(new_text, 'Gap to help find')
#     with open("notes_folder/content.xml", 'w') as f:
#         f.write(file_text)
#         f.close()
#     changed_extension = (output_location + ".zip").replace("zip", "odt")
#     out = subprocess.run(["mv", output_location + ".zip", changed_extension])
#     out
