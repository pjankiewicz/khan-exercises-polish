import re
import os
import pprint
import string

recomp = re.compile

"""
Parses exercise files
"""

RE_OPTIONS = re.M|re.I|re.DOTALL
RE_INCLUDE = [
    recomp("<p([^<>]*)>(.*?)<\/p>",RE_OPTIONS),
    recomp("<title>(.*?)<\/title>",RE_OPTIONS),
]

# ignore text that includes only <code>, <var>
RE_IGNORE = [
    recomp("^<code>[^<>]+<\/code>$",RE_OPTIONS),
    recomp("^<var>[^<>]+<\/var>$",RE_OPTIONS),
    recomp("^<code><var>[^<>]+<\/var><\/code>$",RE_OPTIONS),
    # ignore the blocks with defined t() [translation function]
    recomp("_\(.*?\)",RE_OPTIONS)
]

CLEAN_RULES = [
    # html tags &middot;
    recomp("&[a-z]+;",RE_OPTIONS),
    
    # <var> tag
    recomp("<var>[^\"]*?<\/var>",RE_OPTIONS),            
    
    # functions
    recomp("[a-z]+\([^)]*\)",RE_OPTIONS),
    
    # tags & closing tags
    recomp("<[\/]?[^<>]*>",RE_OPTIONS),
    
    # latex \a{}{} \a{} \a
    recomp(r"\\[a-zA-Z]*{[^}]*}{[^}]*}",RE_OPTIONS),        
    recomp(r"\\[a-zA-Z]*{[^}]*}",RE_OPTIONS),
    recomp(r"\\[a-zA-Z]*",RE_OPTIONS),
    
    # UPPER case more than 2 letters
    recomp("[A-Z0-9_]{2,}"),
    #recomp("[a-z0-9_]{2,}",RE_OPTIONS),
    
    # single characters
    recomp(r"\b[a-zA-Z0-9]{1}\b"),
    
    # anything that is not alphanumeric
    recomp("[^a-zA-Z]*",RE_OPTIONS),
]


RE_RULES = recomp("^t\[""([^\]]+)""\] = ""([^\]]+)""$",RE_OPTIONS)
    
DEBUG = False

class ParseExerciseFiles():
    def __init__(self,path):
        self.texts = {}
        self.traverse_folder()
        self.path = path
        if DEBUG:
            print pprint.pprint(self.texts)
        
    def traverse_folder(self):
        """
        Finds all html files and parses them
        """
        for paths,dirs,files in os.walk(self.path):
            for exercise_file in files:
                if exercise_file.endswith("html"):
                    with open(os.path.join(self.path,exercise_file)) as f:
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
        for rule in CLEAN_RULES:
            if debug == True:
                print html
            html = re.sub(rule,"",html)
        
        if len(html) > 0:
            return True
        else:
            return False