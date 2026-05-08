<?php

require_once __DIR__ . '/../proxy/config.php';

class ProxyClient {

	protected $baseUrl = API_URL;

    public function get($endpoint, $token, $data = []) {
        $url = $this->baseUrl . $endpoint;

        if (!empty($data)){
            $url .= "?".http_build_query($data);
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

        if (curl_errno($ch)) {
            $return = [
                "success" => false,
                "error_code" => "99",
                "error_description" => "Unknown error: " . curl_error($ch) . ". Please contact administrator."
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

        $responseArray = json_decode($response, true);

        if ( !empty($responseArray["error_code"]) ) {
            $return = [
                "success" => false,
                "error_code" =>  $responseArray["error_code"] ,
                "error_description" => $responseArray["error_description"]
            ];
            curl_close($ch);
            return json_encode($return);
        }

        
        curl_close($ch);
        // return $response;
        $responseInArray = json_decode($response, true);
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


        $responseArray = json_decode($response, true);

        if ( $responseArray["error_code"] ) {
            $return = [
                "success" => false,
                "error_code" =>  $responseArray["error_code"] ,
                "error_description" => $responseArray["error_description"]
            ];
        }

        curl_close($ch);

        $responseInArray = json_decode($response, true);
        // if (isset($responseInArray["error_code"])) {

        //     if ( $responseInArray["error_code"] == 0) {
        //         $return = [
        //             "success" => true,
        //             "response" => $response
        //         ];
        //     }
        //     else {
        //         $return = [
        //             "success" => false,
        //             "response" => $response
        //         ];
        //     }
            
        // }
        // else {
        //     $return = [
        //         "success" => false,
        //         "response" => json_encode(["error_code" => null, "error_description" => null ])
        //     ];
        // }
        $return = [
            "success" => true,
            "response" => $response
        ];

        return json_encode($return);
    }
}
