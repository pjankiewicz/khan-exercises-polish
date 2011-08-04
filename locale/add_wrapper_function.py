import re
import os
import pprint
import string

EXERCISE_PATH = os.path.join("..","exercises")
TRANSLATION_FILE = "en.js"

RE_OPTIONS = re.M|re.I|re.DOTALL
RE_INCLUDE = [
    re.compile("<p([^<>]*)>(.*?)<\/p>",RE_OPTIONS),
    re.compile("<title>(.*?)<\/title>",RE_OPTIONS),
]

# ignore text that includes only <code>, <var>
RE_IGNORE = [
    re.compile("^<code>[^<>]+<\/code>$",RE_OPTIONS),
    re.compile("^<var>[^<>]+<\/var>$",RE_OPTIONS),
    re.compile("^<code><var>[^<>]+<\/var><\/code>$",RE_OPTIONS),
    # ignore the blocks with defined t() [translation function]
    re.compile("_\(.*?\)",RE_OPTIONS)
]


RE_RULES = re.compile("^t\[""([^\]]+)""\] = ""([^\]]+)""$",RE_OPTIONS)
    
DEBUG = False

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
            if self.is_valid_to_translate_heurestics_heurestics(t):
                if t not in self.texts:
                    self.texts[t] = {filename,}
                else:
                    self.texts[t].add(filename)
                    
    def parse_text(self,html):
        s = []
        for regex in RE_INCLUDE:
            s.extend(regex.findall(html))
        return list(set(s))

    def is_valid_to_translate_heurestics(self,html,debug=False):
        """
        Checks if the text is valid for translation
        """
    
        CLEAN_RULES = [
            # html tags &middot;
            re.compile("&[a-z]+;",RE_OPTIONS),
            
            # <var> tag
            re.compile("<var>[^\"]*?<\/var>",RE_OPTIONS),            
            
            # functions
            re.compile("[a-z]+\([^)]*\)",RE_OPTIONS),
            
            # tags & closing tags
            re.compile("<[\/]?[^<>]*>",RE_OPTIONS),
            
            # latex \a{}{} \a{} \a
            re.compile(r"\\[a-zA-Z]*{[^}]*}{[^}]*}",RE_OPTIONS),        
            re.compile(r"\\[a-zA-Z]*{[^}]*}",RE_OPTIONS),
            re.compile(r"\\[a-zA-Z]*",RE_OPTIONS),
            
            # UPPER case more than 2 letters
            re.compile("[A-Z0-9_]{2,}"),
            #re.compile("[a-z0-9_]{2,}",RE_OPTIONS),
            
            # single characters
            re.compile(r"\b[a-zA-Z0-9]{1}\b"),
            
            # anything that is not alphanumeric
            re.compile("[^a-zA-Z]*",RE_OPTIONS),
        ]
        
        for rule in CLEAN_RULES:
            if debug == True:
                print html
            html = re.sub(rule,"",html)
        
        if len(html) > 0:
            return True
        else:
            return False    
        
        

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