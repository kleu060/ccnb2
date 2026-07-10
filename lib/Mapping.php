<?php
require_once __DIR__ . '/CheckToken.php';

class Mapping {

    /**
     * Fetches a specific mapping category or all mappings as a JSON string.
     * 
     * @param string|null $type The mapping type to retrieve (e.g., 'ContactType', 'Dunning'). Pass null or empty for all.
     * @return string JSON encoded mapping data.
     */
    public function getMapping(?string $type = '', ?string $token = ""): string {

        if (!class_exists('ConstMapping')) {
            require_once __DIR__ . '/classes/ConstMapping.php';
        }

        // Clear buffer anomalies and set correct API headers
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8');
        }

        $checkToken = new CheckToken($token);
        $checkToken = $checkToken->check();

        if (!$checkToken) {
             $return = [
                "success" => false,
                "error_code" => "999",
                "error_description" => "You don't have permission to view the ConstMapping" 
            ];
            return json_encode($return);
        }

        // If a specific valid constant type is requested, return only that category
        if (!empty($type) && defined("ConstMapping::$type")) {
            return json_encode(constant("ConstMapping::$type"), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        }

        // If no type or an invalid type is specified, fall back to returning all mappings
        $reflection = new ReflectionClass('ConstMapping');
        $allConstants = $reflection->getConstants();

        return json_encode($allConstants, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }


    
}
?>
