import csv
import json
import re

dest = []
i=0

with open("./ecdict/ecdict.csv", encoding="utf-8") as csvfile:
    r = csv.reader(csvfile)
    r.__next__()
    for w in r:
        # TEST ----------------
        # if i>10:
        #     break
        # ---------------------
        if not "zk" in w[7]:
            continue
        else:
            w_ = list(w)
            w_[2] = w_[2].replace("\\r\\n","\n")
            w_[2] = w_[2].replace("\\n","\n")
            w_[3] = w_[3].replace("\\r\\n","\n")
            w_[3] = w_[3].replace("\\n","\n")
            if w_[11]=='""':
                w_[11]=""
            def parse_definition(rawstr):
                destination=list()
                rawstr_lines=rawstr.split("\n")
                type_rule = re.compile(r"^([a-zA-Z]+\. )")
                for line in rawstr_lines:
                    split_result = [x.strip() for x in type_rule.split(line)]
                    if len(split_result)==1:
                        split_result.insert(0,"")
                        split_result.insert(0,"")
                    destination.append(split_result[1:3])
                return destination
            w_[2]=parse_definition(w_[2])
            w_[3]=parse_definition(w_[3])
            dest.append({
                "id": i,
                "word": w_[0],
                "phonetic": w_[1],
                "definition": w_[2],
                "translation": w_[3],
                "pos": w_[4],
                "collins": w_[5],
                "oxford": w_[6],
                "tag": w_[7].split(" "),
                "bnc": w_[8],
                "frq": w_[9],
                "exchange": [x.split(":") for x in w_[10].split("/")],
                "detail": w_[11]
            })
            # break
            i+=1

print(i+1)
print(dest[0]["definition"])
with open("zk_words.json", "w",encoding="utf-8") as zkfile:
    # dev
    # zkfile.write(json.dumps(dest, indent=4,ensure_ascii=False))
    
    zkfile.write(json.dumps(dest, ensure_ascii=False))