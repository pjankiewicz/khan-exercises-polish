#encoding: utf-8
import re
import os
import pprint
import string
import sqlite3
from useful.remass import RegexMass
from useful.joinfiles import joinfiles
import sqlite_export
import csv

recomp = re.compile

EXERCISES_PATH = os.path.join(os.getcwd(),"..","exercises","*.html")
TRANSLATION_FILE = "en.js"
RE_OPTIONS = re.M|re.I|re.DOTALL
TRANSLATION_TAGS_RE = [
    recomp("<p[^<>]*>(.+?)<\/p>",RE_OPTIONS),
    recomp("<title>(.+?)<\/title>",RE_OPTIONS),
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


class Translate():
    def __init__(self):
        self.database_setup()
        self.parse_exercise_files()
        self.update()
        self.database_close()

    def database_setup(self):
        self.conn = sqlite3.connect('translations.sqlite')
        self.cursor = self.conn.cursor()
        
        # tworzę tabelę jeżeli jeszcze nie istnieje
        self.cursor.execute(
        '''
        create table if not exists translations (
            content text unique, 
            translation text,
            filename text, 
            has_translation boolean default 0,
            valid_h text,
            valid_u text,
            used boolean default 0
        )
        ''')
        self.sql = self.cursor.execute
        self.conn.commit()

    def parse_exercise_files(self):
        reg = RegexMass(EXERCISES_PATH)
        
        for r in TRANSLATION_TAGS_RE:
            texts = reg.findall(r)
            for text in texts:
                # sprawdzam czy tekst jest mniej więcej ludzki
                content = text[0]
                translation = text[1]
                valid_h = self.is_valid_to_translate_heurestics(text[0])

                # próbuje dodać wiersz do danych
                try:
                    self.sql("INSERT INTO translations (content, translation, filename, valid_h) VALUES (?,?,?,?)",
                             (content, content, translation, valid_h))
                # jeżeli się nie udało to na pewno kwestia powielonego klucza
                # wtedy tylko updatuje listę plików
                except sqlite3.IntegrityError:
                    # sprawdzam jakie pliki już były zapisane
                    filenames = self.sql("SELECT filename FROM translations WHERE content = ?",(content,)).fetchone()[0]
                    
                    # rozdzielam i znowu sklejam alfabetycznie
                    filenames = filenames.split(",")
                    filenames.append(text[1])
                    filenames = ",".join(sorted(list(set(filenames))))
                    self.sql("UPDATE translations SET filename = ?, valid_h = ? WHERE content = ?",(filenames, valid_h, content))
        self.conn.commit()
    
    def update(self):
        # eksportuje do jednego pliku wszystko
        def export_to_csv():
            sqlite_export.export("translations.sqlite","translations","translation.csv")
        
        # eksportuje do wielu plików
        def export_to_many_files():
            for ind,filename in enumerate(self.sql("SELECT DISTINCT filename FROM translations"),):
                filename = filename[0]
                # jeżeli jest to jedno z tłumaczeń występujących w więcej niz 1 miejscu
                if filename.find(",") > 0:
                    save_filename = "{0}.csv".format(ind)
                else:
                    save_filename = filename.replace(".html",".csv")
                sqlite_export.export("translations.sqlite","translations","translations/%s" % (save_filename),"filename = '%s'" % (filename,))    
        
        # łączy pliki z tłumaczeniami, żeby się nie bawić w wiele plików
        joinfiles("translations/*.csv","translations.csv")
    
        print "Otwieram istniejące tłumaczenia..."
        for line in csv.reader(open("translations.csv")):
            # jeżeli coś jest przetłumaczone 
            content = line[0]
            translation = line[1].decode("utf-8")
            if content != translation:
                # poprawiam tłumaczenie w bazie
                self.sql("UPDATE translations SET translation = ? WHERE content = ?", (translation, content))
        self.conn.commit()
            
        export_to_many_files()
    
    def add_new(self):
        pass
        
    def update_old(self):
        pass
    
    def database_close(self):
        self.conn.close()
        
    def is_valid_to_translate_heurestics(self,html):
        """
        Checks if the text is valid for translation
        """
        for rule in CLEAN_RULES:
            html = re.sub(rule,"",html)
        
        if len(html) > 0:
            return True
        else:
            return False

t = Translate()
