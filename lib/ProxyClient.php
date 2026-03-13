<?php

require_once __DIR__ . '/../proxy/config.php';

class ProxyClient {

    private $baseUrl = API_URL;

    public function get($endpoint, $token) {
        $ch = curl_init($this->baseUrl .'/'. $endpoint);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                "Authorization: Bearer $token"
            ]
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }

    public function post($endpoint, $data, $token) {

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