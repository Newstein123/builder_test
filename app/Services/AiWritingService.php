<?php

namespace App\Services;
use Orhanerday\OpenAi\OpenAi;
use Google\Cloud\Translate\V2\TranslateClient;

class AiWritingService {

    public $open_ai_key;

    public function __construct() {
        $this->open_ai_key = env('OPENAI_KEY');
    }

    public function get_content($message) {
        $open_ai = new OpenAi($this->open_ai_key);
        $msg = [
            [
                "role" => "system",
                "content" => "You are a helpful assistant."
            ],
            [
                "role" => "user",
                "content" => $message
            ],
        ];
        $opts = [
            'model' => 'gpt-3.5-turbo',
            'messages' => $msg,
            'temperature' => 1.0,
            'max_tokens' => 4000,
            'frequency_penalty' => 0,
            'presence_penalty' => 0,
            'stream' => true,
        ];
        header('Content-type: text/event-stream');
        header('Cache-Control: no-cache');
        $open_ai->chat($opts, function ($curl_info, $data) {
            echo $data . "<br><br>";
            echo PHP_EOL;
            ob_flush();
            flush();
            return strlen($data);
         });
    }

    public function translate_content($content) {
        $google_api = env('GOOGLE_API_KEY');
        $translate = new TranslateClient(['key' => $google_api]);
        $data = $translate->translate($content, [
            'target' => 'my'
        ]);
        return $data;
    }
}