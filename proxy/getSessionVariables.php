<?php
    include_once('config.php');
    require_once "../lib/auth.php";
    
    foreach ($_SESSION as $key => $value) {
        if (strpos($key, "access_token") !== 0) {
            $return[$key] = $value;
        }
        
    }
    $return["allowed_pages_tmp"] = $return["allowed_pages"];
    $return["allowed_pages"] = [];
    foreach ( $return["allowed_pages_tmp"]  as $page ) {
        $return["allowed_pages"][] = "". $page;
    } 
    
    /* Debug purpose */
    // $return["allowed_pages"] = ["1001","1002","2001","2002","2003","2004","2005","3001","3002","3003","3004","3005","4001","4002","4003","5001", "5002", "5003","6001","6003","7001","8001","9001","10002"];

    echo json_encode($return);

