<?php

require_once __DIR__ . '/ProxyClient.php';

class CheckToken {

    private $token = "";

    public function __construct($token) {
        $this->token = $token;

    }

    public function check() {
        // success return false if user doesn't have permission to view
        $client = new ProxyClient();
        $res =  $client->get("/auth/checktoken.php", $this->token);
        if ( $res == json_decode($res) ) {
            if ( !$res["success"] ) {
                return false;
            }
            else {
                $response = json_decode($res["response"] );
                if ($response["error_code"] != 0) {
                    return false;
                }
            }
        }
        return true;
    }
}