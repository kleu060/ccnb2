<?php

require_once __DIR__ . '/../proxy/config.php';

class ProxyClient {

	protected $baseUrl = API_URL;

    public function get($endpoint, $token, $data = []) {
        $url = $this->baseUrl . $endpoint;

        if (!empty($data)){
            $url .= "?".http_build_query($data);
        }


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

        rewind($verbose);
        $verboseLog = stream_get_contents($verbose);
        // echo "verboseLog: " . $verboseLog;

        if (curl_errno($ch)) {
            echo curl_error($ch);
            $response = [ 
                "success" => false,
                "error_code" => "99",
                "error_description" => "Unknown error". curl_error($ch)
                ];
            return json_encode($response);
        }

        curl_close($ch);
        return $response;
    }

    public function post($endpoint, $token, $data = []) {


        $ch = curl_init($this->baseUrl . $endpoint);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer $token",
                "Content-Type: application/json"
            ],
            CURLOPT_POSTFIELDS => json_encode($data)
        ]);

        $response = curl_exec($ch);


        curl_close($ch);

        return $response;
    }
}
