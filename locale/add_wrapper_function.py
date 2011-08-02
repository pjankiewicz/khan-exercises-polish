import re
import os
import pprint

EXERCISE_PATH = os.path.join("..","exercises")

RE_OPTIONS = re.M|re.I|re.DOTALL
RE_INCLUDE = [
    re.compile("<p[^<>]*>(.*?)<\/p>",RE_OPTIONS),
    re.compile("<title>(.*?)<\/title>",RE_OPTIONS),
]

TRANSLATION_FILE = "en.js"

# ignore text that includes only <code>, <var>
RE_IGNORE = [
    re.compile("^<code>[^<>]+<\/code>$",RE_OPTIONS),
    re.compile("^<var>[^<>]+<\/var>$",RE_OPTIONS),
    re.compile("^<code><var>[^<>]+<\/var><\/code>$",RE_OPTIONS),
    # ignore the blocks with defined t() [translation function]
    re.compile("_\(.*?\)",RE_OPTIONS),
]

RE_RULES = re.compile("^t\[""([^\]]+)""\] = ""([^\]]+)""$",RE_OPTIONS)
    
DEBUG = False

class ParseExerciseFiles():
    def __init__(self):
        self.texts = {}
        self.traverse_folder()
        if DEBUG:
            print pprint.pprint(self.texts)
        
    def traverse_folder(self):
        """
        Finds all html files and parses them
        """
        for paths,dirs,files in os.walk(EXERCISE_PATH):
            for exercise_file in files:
                if exercise_file.endswith("html"):
                    with open(os.path.join(EXERCISE_PATH,exercise_file)) as f:
                        self.parse_exercise_html(f.read(),exercise_file)

    def parse_exercise_html(self,html,filename):
        """
        Searches html for different tags
        """
        for t in self.parse_text(html):
            if self.is_valid_to_translate(t):
                if t not in self.texts:
                    self.texts[t] = {filename,}
                else:
                    self.texts[t].add(filename)
                    
    def parse_text(self,html):
        s = []
        for regex in RE_INCLUDE:
            s.extend(regex.findall(html))
        return list(set(s))

    def is_valid_to_translate(self,html):
        """
        Checks if the text is valid for translation
        """
        for regex in RE_IGNORE:
            if len(regex.findall(html)) > 0:
                return False
        
        return True
        
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