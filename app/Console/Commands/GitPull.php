<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpGit\Git;

class GitPull extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'git:pull';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $templateName = 'new-template';

        // Specify the path to the cloned repository
        $repositoryPath = storage_path("app/template-creations/$templateName");

        // Create a Git instance
        $git = new Git($repositoryPath);

        // Pull changes from the remote repository
        $git->pull('origin', 'main'); // Replace 'main' with the appropriate branch name
    }
}
