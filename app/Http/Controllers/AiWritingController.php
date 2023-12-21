<?php

namespace App\Http\Controllers;

use App\Services\AiWritingService;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AiWritingController extends Controller
{
    protected $aiWritingService;

    public function __construct(AiWritingService $aiWritingService)
    {
        $this->aiWritingService = $aiWritingService;
    }

    public function get_message(Request $request)
    {   
        // dd($this->aiWritingService->translate_content("Hello World"));
        $message = $request->input('message', 'hello chat gpt');

        // Assuming you want to use SSE to stream real-time updates
        return $this->streamAiContent($message);
    }

    public function index()
    {
        return view('test.ai-writing'); // Assuming your view is in the "test" folder
    }

    protected function streamAiContent($message)
    {
        $response = new StreamedResponse(function () use ($message) {
            $this->aiWritingService->get_content($message);
        });

        $response->headers->set('Content-Type', 'text/event-stream');
        $response->headers->set('Cache-Control', 'no-cache');
        $response->headers->set('Connection', 'keep-alive');

        return $response;
    }
}
