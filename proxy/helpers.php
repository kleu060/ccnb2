<?php
    /**
     * Write a simple curl log to /var/log/ccnb2/proxy_client.log
     * Make sure apache/nginx user has write permission to the directory/file.
     */
    function writeCurlLog($method, $url, $token, $data, $response, $httpCode, $verboseLog) {
        $date = date("Y_m_d");
        $logDir = '/var/log/ccnb2';
        $logFile = $logDir . '/proxy_client_'.$date.'.log';

        // ensure directory exists
        if (!is_dir($logDir)) {
            @mkdir($logDir, 0755, true);
        }

        // mask token (show last 6 chars only)
        $maskedToken = '';
        if (!empty($token)) {
            $maskedToken = '***' . substr($token, -6);
        }

        // prepare data string
        $dataStr = '';
        if (is_array($data)) {
            $dataStr = http_build_query($data);
        } else {
            $dataStr = (string) $data;
        }

        // truncate long values to avoid huge log lines
        $maxLen = 2000;
        $responsePreview = substr($response ?? '', 0, $maxLen);
        $verbosePreview = substr($verboseLog ?? '', 0, $maxLen);

        $entry = sprintf(
            "[%s] %s %s\nDATA:%s\nHTTP_CODE:%s\nRESPONSE:%s\n\n",
            date('Y-m-d H:i:s'),
            $method,
            $url,
            // $maskedToken,
            $dataStr,
            $httpCode,
            $responsePreview,
            // $verbosePreview
        );

        // append to file (best-effort, don't break execution on failure)
        @file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
    }