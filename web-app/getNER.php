<?php
    /**
     * Get parameter value from AJAX call
     */
    $request_data = $_POST['content'];

    /**
     * Prepare executable command and execute it
     * get returned value from Python script and response to javascript
     */
    // $request_data='abc';
    $command = escapeshellcmd('python3 ./test.py '.'"'.$request_data.'"');
    $output = shell_exec($command);
    // $string= mb_convert_encoding($output, 'ISO-8859-1', 'UTF-8');
    echo ($output);