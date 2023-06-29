def isWordEndWithSpecialCharacter(word):
    # split word into characters
    l_word = [*word]
    # print (l_word[-1])
    set_of_chars = [',', '"', '(', ')']
    if len(l_word) > 1:
        if l_word[-1] in set_of_chars:
            first = ''.join(l_word[0:-1])
            second = l_word[-1]
            return first + ' ' + second
        elif l_word[0] in set_of_chars:
            first = l_word[0]
            second = ''.join(l_word[1:])
            return first + ' ' + second
    return word


def toStandardisedSentence(sentence):
    temp = sentence.split()
    # sent = sentence.split()[0:-1]
    sent = temp[0:len(temp)-1]
    f_sentence = []
    for each in sent:
        f_sentence.append(isWordEndWithSpecialCharacter(each))
    
    last_word = temp[-1]
    last_word = [*last_word]
    if len(last_word) >1:
        if last_word[-1] == '.':
            first = ''.join(last_word[0:-1])
            second = last_word[-1]
            f_sentence.append(first+' '+second)
    else:
        f_sentence.append(last_word[0])

    return ' '.join(f_sentence)
# strr = '"Bệnh_nhân 84" , nam, 21 tuổi, địa_chỉ ở Đống_Đa , Hà_Nội , du_học_sinh tại Anh , nhập_cảnh Nội_Bài ngày 18/3 trên chuyến VN 54 .'
# print (toStandardisedSentence(strr))