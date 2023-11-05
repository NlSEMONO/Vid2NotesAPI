txt = ['\n•ajkasdjkasjd \n•asjdkajsdkajsd']
txt[0] = txt[0].split('•')
print(txt)
for i in range(len(txt[0])):
    txt[0][i] = txt[0][i].strip()
print(txt)