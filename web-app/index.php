<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CT550 - Thesis demonstration</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="this.css">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <!-- jQuery library -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <!-- Popper JS -->
    <!-- <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script> -->

    <!-- Latest compiled JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>

<body>
    <div class="my-container">
        <div class="left-side-bar">
            <div class="sidebar-func">
                <a href="/"><span class="fa fa-home"></span></a>
                <span class="fa fa-user"></span>
                <span class="fa fa-bookmark"></span>
                <span class="fa fa-file"></span>
                <span class="fa fa-cog"></span>
                <span class="fa fa-close" id="close"></span>
            </div>
        </div>
        <div class="right-side-bar">
            <div class="content">
                <div class="title">
                    <a style="color: black; text-decoration: none;" href="/">
                    <!-- named entity recognition system -->
                    Hệ thống Nhận dạng thực thể có tên
                </a>
                </div>
                <div class="subtitle">
                    <!-- a demonstration of graduation thesis by Ngo Tran Vinh Thai
                    - spring 2023 -->
                    Chương trình demo xử lý tác vụ
                </div>
                <div>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <div class="tools">
                    <span class="btn btn-danger" id="paragraph"><span class="fa fa-paragraph"></span> Đoạn văn</span>
                    <span class="btn btn-warning"><span class="fa fa-file-o"></span> Tài liệu</span>
                    <span class="btn btn-info"><span class="fa fa-table"></span> Tách xuất cấu trúc</span>
                </div>
            </div>
            <div class="display">
                <div class="result" id="result">Giới thiệu:</div>
                <div id="paragraph-area">
                    <textarea id="para-content" cols="5" rows="20"></textarea>
                </div>
                <div id="representation-layer">
                    <!-- This is used to display result from python script -->
                </div>
                <!-- <div class="raw-content">
                    Named Entity Recognition is a core task in the field of Natural Language Processing and is known as a fundamental base
                    for other tasks such as Question-Answering, structural information extracting,... which helps indentify
                    entites in input data and classify them into predefined classes.
                    <br>
                    With the development of recent transformer-based models like T5 or BERT, the performace on Named Entity Recognition task
                    has been shown to improve substantially, and even further if a monolingual model could be considered to apply.
                    <br>
                    Therefore, in this thesis, we'll apply ViT5 model to demonstrate how a monoligual pretrained model can overcome known obstacles and 
                    achieve a better result, especially with Vietnamese language - a language with accents.
                </div> -->
                <div class="raw-content">
                    * Nhận dạng thực thể có tên là một trong nhũng tác vụ cốt lõi trong lĩnh vực xử lý ngôn ngữ tự nhiên và được biến đến
                    như một cơ sở nền tảng cho các tác vụ khác như Hỏi-Đáp, trích xuất thông tin có cấu trúc,... tác vụ giúp xác định và
                    phân loại các thực thể xác định được trong dữ liệu đầu vào vào một trong các lớp đã được định nghĩa trước.
                    <br>
                    * Với sự phát triển của một số mô hình dựa trên Transformer như BERT hay T5, hiệu suất của tác vụ nhận dạng thực thể có tên
                    đã được chứng minh là có sự cải thiện đáng kể, và thậm chí là cải thiện hơn với sự xuất hiện của các mô hình đơn ngữ.
                    <br>
                    * Vì vậy, trong luận án này, chúng tôi sẽ sử dụng một số mô hình học sâu để thực hiện tác vụ này, với sự hổ trợ từ mô hình
                    đơn ngữ ViT5 và BERT.
                </div>
                <div class="visual-content">
                    <!-- See visual content -->
                </div>
            </div>
        </div>
        <div class="footer">
            <div>
                <!-- This was created as a part of my thesis. All rights reserved. -->
                Luận văn tốt nghiệp 2023.
            </div>
        </div>
    </div>
</body>

<script src="sys.js"></script>

</html>