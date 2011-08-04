import re
import os
import pprint
import string

EXERCISE_PATH = os.path.join("..","exercises")
TRANSLATION_FILE = "en.js"

"""
Read existing translation
Read texts to be translated from exerises
    use tags i18n to get 
    use heurestics
        exclude those translations which are marked as translatable (first column)
If existing translation is changed:
    don't overwrite it
else:
    overwrite
    
Translation file format (columns):
- is valid for translation
- text to be translated
- translation
- has translation
- exercise list
- is used in exercises (if there is no such text in exercises it means that 
                        it is no longer used - probably was changed)
"""

class Translation():
    def __init__(self,line):
        self.is_valid_for_translation = line[0]
        self.text = line[1]
        self.translation = line[2]
        self.has_translation = True if self.text != self.translation else False
        self.exercise_list = line[3]

        
        

def parse():
    p = ParseExerciseFiles()

    # if file exists try to parse existing rules
    if os.path.exists(TRANSLATION_FILE):
        with open(TRANSLATION_FILE) as outputfile:
            html = outputfile.read()
            # 
            for t in RE_RULES.findall(html):
                print t

    # overwrite file
    outputfile = open(TRANSLATION_FILE,"w")

    # generic texts which appear more than once
    outputfile.write("# Text that appeared more than once\n\n")
    for text,filename in p.texts.items():
        if len(filename) > 1:
            outputfile.write('# %s\nt["%s"] = ""\n\n' % (", ".join(list(filename)),text))

    # texts that appear only once (sorted by filename)
    outputfile.write("# Text that appeared one time\n\n")        
    unique_texts = [[text,list(filename)[0]] for text,filename in p.texts.items() if len(filename) == 1]

    # aggregate files
    unique_texts_aggr = {}
    for text,filename in unique_texts:
        if filename not in unique_texts_aggr:
            unique_texts_aggr[filename] = [text]
        else:
            unique_texts_aggr[filename].append(text)

    # create sorted list
    for filename in sorted(unique_texts_aggr.keys()):
        texts = sorted(unique_texts_aggr[filename])
        outputfile.write('# %s\n\n' % (filename,))
        for t in texts:
            outputfile.write('t["%s"] = "%s"\n' % (t,t))
        outputfile.write("\n\n")

    outputfile.close()

parse()