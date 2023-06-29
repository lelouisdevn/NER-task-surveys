#!/usr/local/bin/python
#Get command line arguments
import sys
from unidecode import unidecode
data = sys.argv[1]

#Load library, init a segmenter, segment text
# from python_rdrsegmenter import load_segmenter
# segmenter = load_segmenter()
# segmented_data = segmenter.tokenize(data)

##################################################
# # Load tokenizer and NER model
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
tokenizer = AutoTokenizer.from_pretrained("VietAI/vit5-base")
# model = AutoModelForSeq2SeqLM.from_pretrained("checkpoint/checkpoint-12570")
model = AutoModelForSeq2SeqLM.from_pretrained("checkpoint/word")

# Predict named entities with sentence
tokenized_sentence = tokenizer(data, return_tensors='pt', max_length=1024)
input_ids, attention_mask = tokenized_sentence['input_ids'], tokenized_sentence['attention_mask']
outputs = model.generate(
    input_ids=input_ids,
    attention_mask=attention_mask,
    max_length=1024
)
label = tokenizer.decode(outputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)
##################################################
def word_labels(sentence, labels):
  predictions = ["O" for i in range(len(sentence.split()))]
  if labels != '':
    list_labels = labels.split(";")
    sent = sentence.lower().split()

    start = 0
    for i in range(len(list_labels)):
      sub_list = list_labels[i].split(":")
      class_entity = sub_list[0].strip() # location, organization, age,...
      named_entity = sub_list[1].strip().lower() # Ha Noi, London, 433,...
      named_entity_element = named_entity.split() # Ha, Noi, London, 433, Soc Trang,...

      flist = []
      for i in range(len(named_entity_element)):
        if named_entity_element[i][-1] == ',':
          entity1 = named_entity_element[i][0:len(named_entity_element[i])-1]
          entity2 = ","
          flist.append(entity1)
          flist.append(entity2)
        else:
          flist.append(named_entity_element[i])

      named_entity_element = flist
      for i in range(len(named_entity_element)): 
        try:
          findex = sent.index(named_entity_element[i], start)
          start = findex + 1
          f_class = ""
          if i == 0:
            f_class = "B-" + class_entity
          else:
            f_class = "I-" + class_entity
          predictions[findex] = f_class
        except:
          pass

  return predictions 

import standardise as stdd
# process data
sentence = stdd.toStandardisedSentence(data)
modified_sentence = sentence
# label = 'PATIENT_ID: 785; GENDER: nam; AGE: 42; LOCATION: Đức_Thượng; LOCATION: Hoài_Đức; LOCATION: Hà_Nội'
data = word_labels(sentence, label)
data = ' '.join(data) # pass to PHP as a string => 'O B-ORGANIZATION O B-NAME B-AGE O O'

exported_data = data + '*' + label + '*' + modified_sentence
##### Pass variable 'exported_data' as an output of Python script

print(unidecode(exported_data))