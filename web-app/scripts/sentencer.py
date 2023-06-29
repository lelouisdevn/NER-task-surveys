import json
# data = [json.loads(line) for line in open('C:/Ct550/data/syllable/test_syllable.json', 'r', encoding='utf-8')]
# data = [json.loads(line) for line in open('C:/Ct550/data/word/test_word.json', 'r', encoding='utf-8')]
data = [json.loads(line) for line in open('C:/Ct550/data/syllable/test_syllable.json', 'r', encoding='utf-8')]

# print (data[0:5])
syllable = []
for i in range(3000):
    temp = data[i]['words']
    new_sent = []
    for i in range(len(temp)):
        if temp[i] != '"':
            new_sent.append(temp[i])
    syllable.append(' '.join(new_sent))

fsyllable = '\n'.join(syllable)
# print (fsyllable[0:5])

f = open('syllabellevel.txt', 'w', encoding='utf-8')
f.write(fsyllable)
f.close()