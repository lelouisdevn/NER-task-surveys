/**
 * on clicking 'paragraph' button, show a textarea where user can input data
 */
$('#paragraph').on('click', function () {
    /**
     * Reset initial variables
     */
    responsed_data = ""
    output = []
    $('.raw-content').html('')
    $('.visual-content').html('')
    $('#result').html('Nhập:')
    $('#paragraph-area').css('display', 'block')
    $('#para-content').focus()
    $('#representation-layer').html('')
    $('#representation-layer').css('border', 'none')
})

/**
 * On textarea, when user enters, send the data to server for procession and show results
 * via through AJAX calls
 */
var responsed_data = ""
var output = []
var rcontent = ""
$('#paragraph-area').on('keydown', function (e) {
    if (e.which == 13) {
        //get user iput, clear the textarea after that
        let content = $('#para-content').val()
        $('#para-content').val('')
        /**
         * display representation-layer 
         */
        $('#paragraph-area').css('display', 'none')
        $('#representation-layer').css('display', 'block')
        $('#representation-layer').html('Đang xử lý...')
        $('#result').html('Kết quả:')
        /**
         * perform an AJAX call to get named entities in sentence passed by user
         */
        $.ajax({
            url: 'getNER.php',
            method: 'POST',
            type: 'text',
            data: { content: content },
            success: function (data) {
                /**
                 * display data after post-processing to #representation-layer
                 * returned data format: 'Original sentence*converted sentence*named entities string'
                 */

                data = data.split('*')
                console.log(data)
                if (data[0] != '') {
                    let fdata = data[0].split(' ') //transform to JavaScript array
                    responsed_data = data[1]
                    rcontent = content
                    let sent = data[2].split(' ')
                    if (fdata.length == sent.length) {
                        let formatted_string = format_string(sent, fdata)
                        for (let i = 0; i < formatted_string.length; i++) {
                            output.push(getCSS(formatted_string[i]))
                        }
                        /**
                         * Display a link to raw-content, display CSSed data to #representation-layer
                         */
                        $('#representation-layer').css('border', 'solid grey 1px')
                        $('#representation-layer').html(output.join(' '))
                        $('.raw-content').css({ 'display': 'block', 'text-decoration': 'underline', 'cursor': 'pointer' })
                        $('.raw-content').html("Xem dữ liệu thô")
                    }
                }else {
                    $('#representation-layer').html('Some errors have occurred due to format mismatch.')
                }
                // } else {
                //     $('#representation-layer').html('Some errors have occurred due to format mismatch.')
                //     $('#representation-layer').css('border', 'solid grey 1px')
                //     $('.raw-content').css({ 'display': 'block', 'text-decoration': 'underline', 'cursor': 'pointer' })
                //     $('.raw-content').html("See raw content?")
                // }
            }
        })
    }
})
$('.visual-content').on('click', function () {
    $('.visual-content').css('display', 'none')
    $('#representation-layer').html(output.join(' '))
    $('.raw-content').css({ 'display': 'block', 'text-decoration': 'underline', 'cursor': 'pointer' })
    $('.raw-content').html("Xem dữ liệu thô")
})

$('.raw-content').on('click', function () {
    let another_fdata = "<b>Câu đầu vào:</b> " + rcontent + "<br/><b>Thực thể được dự đoán:</b><br/>" + responsed_data
    $('#representation-layer').html(another_fdata)
    $('.raw-content').css('display', 'none')
    $('.visual-content').css({ 'display': 'block', 'cursor': 'pointer', 'text-decoration': 'underline' })
    $('.visual-content').html('Xem dữ liệu trực quang')
})

/**
 * Two lines of codes below are about examples of named entity recognition task
 * with all 10 types of label.
 */
sentence = ["B19xxxxx", "xe_máy", "Ngo Tran Vinh Thai", "sinh_vien", "Dai_hoc", 'Can_Tho', "Thanh_pho", "Can_Tho", 'suc_khoe', 'tot', 'nam', '22', 'Thang_Mot', '21', '.']
labels = ["B-PATIENT_ID", "B-TRANSPORTATION", "B-NAME", "B-JOB", "B-ORGANIZATION", 'I-ORGANIZATION', "B-LOCATION", "I-LOCATION", 'B-SYMPTOM_AND_DISEASE', 'I-SYMPTOM_AND_DISEASE', 'B-GENDER', 'B-AGE', 'B-DATE', 'I-DATE', 'O']

/**
 * Define colors for word, background colors for each label type
 */
const tags = ['O', 'PATIENT_ID', 'NAME', 'AGE', 'GENDER', 'JOB', 'LOCATION', 'ORGANIZATION', 'TRANSPORTATION', 'SYMPTOM_AND_DISEASE', 'DATE']
const bgcolors = ['white', '#AF1B3F', '#F18F01', '#70A37F', '#2B4570', '#27474E', '#5F506B', '#72195A', 'tomato', '#3581B8', '#CE5374']
const colors = ['black', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white']

/**
 * This function convert original sentence to a formatted sentence which has inserted named entites
 * take this as example: "Benh_nhan '194 [PATIENT_ID]' sinh_song tai 'TP Can_Tho [LOCATION]"
 */
function format_string(sentence, labels) {
    var str = ""
    var formats = []
    for (let i = 0; i < labels.length - 1; i++) {
        if (labels[i].substring(0, 1) == 'B' || labels[i].substring(0, 1) == 'I') {
            if (labels[i + 1].substring(0, 1) == 'B' || labels[i + 1].substring(0, 1) == 'O') {
                str += sentence[i] + " " + "[" + labels[i].substring(2, labels[i].length) + "]"
                formats.push(str)
                str = ""
            } else {
                str += sentence[i] + " "
            }
        } else {
            formats.push(sentence[i])
        }
    }
    formats.push(sentence[labels.length - 1])
    return formats
}

/**
 * get color and background color for 'that' named entity
 * create a template applied with CSS
 */
function getCSS(data) {
    let label = data.substring(data.indexOf('[') + 1, data.length - 1)
    let template = ""
    let color = colors[tags.indexOf(label)]
    let bgcolor = bgcolors[tags.indexOf(label)]

    template = '<span style="background-color:' + bgcolor + ';color:' + color + '">' + data + '</span>'
    return template
}

/**
 * apply css to every data samples and join into a single string for display
 */
var formats = format_string(sentence, labels)
var data_cssed = []
for (let i = 0; i < formats.length; i++) {
    data_cssed.push(getCSS(formats[i]))
}

/**
 * representation layer display
 */
$('#representation-layer').html(data_cssed.join(" "))