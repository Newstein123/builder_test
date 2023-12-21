<?php 

use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Artisan;
use PhpGit\Git;

Route::get('/create',function() {
    // GitHub organization name
    $organizationName = 'tennthone';
    
    // GitHub API endpoint for creating a repository
    $apiEndpoint = "https://api.github.com/orgs/$organizationName/repos";
    
    // GitHub personal access token with the necessary permissions (replace with your token)
    $accessToken = env('GIT_TOKEN');
    
    // Repository details
    $repositoryName = 'new-repo';
    $repositoryDescription = 'Description of the new repository';
    
    // Create a Guzzle HTTP client
    $client = new Client();
    
    // Make a POST request to GitHub API to create a new repository
    $response = $client->request('POST', $apiEndpoint, [
        'headers' => [
            'Authorization' => "Bearer $accessToken",
            'Accept' => 'application/vnd.github.v3+json',
        ],
        'json' => [
            'name' => $repositoryName,
            'description' => $repositoryDescription,
            // You can include other repository settings here as needed
        ],
    ]);
    
    // Get the created repository details from the response (if needed)
    $createdRepository = json_decode($response->getBody(), true);
    
    // Output the created repository details
    print_r($createdRepository['html_url']);
    

});

Route::get('/clone', function() {
     // Assume $repositoryUrl and $templateName are user-provided values
     $repositoryUrl = 'https://github.com/Newstein123/modalpopup.git';
     $templateName = 'new-template';
 
     // Specify the destination directory for the cloned repository
     $destination = storage_path("app/template-creations/$templateName");
 
     // Clone the repository using the git command
     $git = new Git();
     $git->clone($repositoryUrl, $destination);
     return view('test.zip.index');
});

Route::get('/pull', function() {
    $templateName = 'new-template';

    // Specify the path to the cloned repository
    $repositoryPath = storage_path("app/template-creations/$templateName");
    
    // Navigate to the repository directory
    chdir($repositoryPath);
    
    // Pull changes from the remote repository
    Artisan::call('git:pull');
    dd('git pull done');
});

Route::get('remote-urls', function() {

    $organizationName = 'tennthone';
    $accessToken = env('GIT_TOKEN');

    // GitHub API endpoint for listing repositories in the organization
    $apiEndpoint = "https://api.github.com/orgs/$organizationName/repos";

    // Create a Guzzle HTTP client
    $client = new Client();

    // Make a GET request to GitHub API to list repositories
    $response = $client->request('GET', $apiEndpoint, [
        'headers' => [
            'Authorization' => "Bearer $accessToken",
            'Accept' => 'application/vnd.github.v3+json',
        ],
    ]);

    // Decode the JSON response
    $repositories = json_decode($response->getBody(), true);

    // Extract and print the remote URLs of each repository
    foreach ($repositories as $repo) {
        $repoName = $repo['name'];
        $remoteUrl = $repo['ssh_url']; // You can also use $repo['clone_url'] for HTTPS URLs

        echo "Repository: $repoName\n";
        echo "Remote URL: $remoteUrl\n\n";
    }

});

Route::get('open-with-vscode', function() {
    return view('test.vscode.index');
});

Route::get('push', function() {
    $templateName = 'new-template';
    // Assume $repositoryPath is the path to the cloned repository within your Laravel app
    $repositoryPath = storage_path("app/template-creations/$templateName");

    // Navigate to the repository directory
    chdir($repositoryPath);

    // Make changes to files in the repository

    // Stage and commit changes
    exec("git add .");
    exec("git commit -m 'new changes'");

    // Push changes to GitHub (replace 'master' with the appropriate branch)
    exec("git push origin main");
    dd('git push done');
});