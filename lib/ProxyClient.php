<?php

require_once __DIR__ . '/../proxy/config.php';
require_once __DIR__.'/../proxy/helpers.php';

class ProxyClient {

	protected $baseUrl = API_URL;

    public function get($endpoint, $token, $data = [], $decode = false) {
        $url = $this->baseUrl . $endpoint;
        
        if (!empty($data)){
            if ($decode) {
                $url .= "?" . urldecode(http_build_query($data));
            }
            else {
                $url .= "?".http_build_query($data);
            }
        }

        // echo $url; exit();
        // echo $url; return "";
        
        $ch = curl_init($url);

        $verbose = fopen('php://temp', 'w+');

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer $token",
		        "User-Agent: Mozilla/5.0",
                "Accept: application/json"

            ],
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_VERBOSE => true,
            CURLOPT_STDERR => $verbose,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        // print_r($response); exit();
        rewind($verbose);
        $verboseLog = stream_get_contents($verbose);

        writeCurlLog('GET', $url, $token, $data, $response, $httpCode, $verboseLog);

        if (curl_errno($ch)) {
            writeCurlLog('GET', $url, $token, $data, curl_error($ch), $httpCode, $verboseLog);

            $returnResponse = [
                "error_code" => "99",
                "error_description" => "Unknown error: " . curl_error($ch) . ". Please contact administrator."
            ];
            $return = [
                "success" => false,
                "response" => json_encode($returnResponse)
            ];
            curl_close($ch);
            return json_encode($return);
        }


        if ($httpCode >= 400) {

            $returnResponse = [
                "error_code" => $httpCode,
                "error_description" => "HTTP error: ".$httpCode. "<br />url: " .$url. "<br />" . $verboseLog. ".<br />Please contact administrator." 
            ];


            $return = [
                "success" => false,
                "response" => json_enocde($returnResponse)
            ];
            curl_close($ch);
            return json_encode($return);
        }

        $responseArray = json_decode($response, true);

        $returnResponse = [
            "error_code" =>  $responseArray["error_code"] ,
            "error_description" => $responseArray["error_description"]
        ];
        if ( !empty($responseArray["error_code"]) ) {
            $return = [
                "success" => false,
                "response" => json_encode($returnResponse)
            ];
            curl_close($ch);
            return json_encode($return);
        }

        
        curl_close($ch);
        // return $response;
        
        $responseInArray = json_decode($response, true);

        if (isset($responseInArray["error_code"]) && $responseInArray["error_code"] != 0) {
            $return = [
                "success" => false,
                "response" => $response
            ];
        }
        else {
            $return = [
                "success" => true,
                "response" => $response
            ];
        }
        return json_encode($return);
    }

    public function post($endpoint, $token, $data = []) {


        $ch = curl_init($this->baseUrl . $endpoint);
        $verbose = fopen('php://temp', 'w+');


        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer $token",
		        // "User-Agent: Mozilla/5.0",
                "Accept: application/json",
                "Content-Type: application/x-www-form-urlencoded",
                // "Content-Type: application/json",

            ],
            CURLOPT_POSTFIELDS =>  http_build_query($data),
            // CURLOPT_POSTFIELDS =>  json_encode($data),
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_VERBOSE => true,
            CURLOPT_STDERR => $verbose,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        rewind($verbose);
        $verboseLog = stream_get_contents($verbose);

        writeCurlLog('POST', $this->baseUrl . $endpoint, $token, $data, $response, $httpCode, $verboseLog);

        if (curl_errno($ch)) {
            $return = [
                "success" => false,
                "error_code" => "99",
                "error_description" => "Unknown error: " . curl_error($ch)
            ];
            curl_close($ch);
            return json_encode($return);
        }

        if ($httpCode >= 400) {
            $return = [
                "success" => false,
                "error_code" => $httpCode,
                "error_description" => "HTTP error: ".$httpCode. "<br />url: " .$url. "<br />" . $verboseLog. ".<br />Please contact administrator." 
            ];
            curl_close($ch);
            return json_encode($return);
        }

        curl_close($ch);
        $responseArray = json_decode($response, true);

        if (isset($responseInArray["error_code"])) {
            $return = [
                "success" => false,
                "response" => $response
            ];
        }
        else {
            $return = [
                "success" => true,
                "response" => $response
            ];
        }

        return json_encode($return);
    }

    // /**
    //  * Write a simple curl log to /var/log/ccnb2/proxy_client.log
    //  * Make sure apache/nginx user has write permission to the directory/file.
    //  */
    // private function writeCurlLog($method, $url, $token, $data, $response, $httpCode, $verboseLog) {
    //     $date = date("Y_m_d");
    //     $logDir = '/var/log/ccnb2';
    //     $logFile = $logDir . '/proxy_client_'.$date.'.log';

    //     // ensure directory exists
    //     if (!is_dir($logDir)) {
    //         @mkdir($logDir, 0755, true);
    //     }

    //     // mask token (show last 6 chars only)
    //     $maskedToken = '';
    //     if (!empty($token)) {
    //         $maskedToken = '***' . substr($token, -6);
    //     }

    //     // prepare data string
    //     $dataStr = '';
    //     if (is_array($data)) {
    //         $dataStr = http_build_query($data);
    //     } else {
    //         $dataStr = (string) $data;
    //     }

    //     // truncate long values to avoid huge log lines
    //     $maxLen = 2000;
    //     $responsePreview = substr($response ?? '', 0, $maxLen);
    //     $verbosePreview = substr($verboseLog ?? '', 0, $maxLen);

    //     $entry = sprintf(
    //         "[%s] %s %s\nDATA=%s\nHTTP_CODE=%s\nRESPONSE=%s\n\n",
    //         date('Y-m-d H:i:s'),
    //         $method,
    //         $url,
    //         // $maskedToken,
    //         $dataStr,
    //         $httpCode,
    //         $responsePreview,
    //         // $verbosePreview
    //     );

    //     // append to file (best-effort, don't break execution on failure)
    //     @file_put_contents($logFile, $entry, FILE_APPEND | LOCK_EX);
    // }
}


