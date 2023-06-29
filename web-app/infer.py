from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
tokenizer = AutoTokenizer.from_pretrained("VietAI/vit5-base")
model = AutoModelForSeq2SeqLM.from_pretrained('checkpoint/word')

data = input("Inputs: ")
tokenized_sentence = tokenizer(data, return_tensors='pt', max_length=1024)
input_ids, attention_mask = tokenized_sentence['input_ids'], tokenized_sentence['attention_mask']
outputs = model.generate(
    input_ids=input_ids,
    attention_mask=attention_mask,
    max_length=1024
)
label = tokenizer.decode(outputs[0], skip_special_tokens=True, clean_up_tokenization_spaces=True)

print ("\nRESULTS:")
print (label)