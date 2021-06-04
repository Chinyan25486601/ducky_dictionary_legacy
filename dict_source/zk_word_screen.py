import csv
import json
import re

dest = []

with open("./ecdict/ecdict.csv", encoding="utf-8") as csvfile:
    r = csv.reader(csvfile)
    r.__next__()
    i=1
    for w in r:
        # TEST ----------------
        # if i>10:
        #     break
        # ---------------------
        if not "zk" in w[7]:
            continue
        else:
            w_ = list(w).copy()
            w_[2] = w_[2].replace("\\r\\n","\n")
            w_[2] = w_[2].replace("\\n","\n")
            w_[3] = w_[3].replace("\\r\\n","\n")
            w_[3] = w_[3].replace("\\n","\n")
            if w_[11]=='""':
                w_[11]=""
            print(w_[2])
            dest.append({
                "word": w_[0],
                "phonetic": w_[1],
                "definition": w_[2],
                "translation": w_[3],
                "pos": w_[4],
                "collins": w_[5],
                "oxford": w_[6],
                "tag": w_[7],
                "bnc": w_[8],
                "frq": w_[9],
                "exchange": w_[10],
                "detail": w_[11]
            })
            # break
            i+=1

print(i)
print(dest[0]["definition"])
with open("zk_words.json", "w",encoding="utf-8") as zkfile:
    zkfile.write(json.dumps(dest, indent=4,ensure_ascii=False))