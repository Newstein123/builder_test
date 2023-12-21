<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    @php
        // Assume $remoteUrl is the remote URL of the Git repository
        $remoteUrl = 'git@github.com:tennthone/template_one.git';

        // Construct the VSCode URL
        $vscodeUrl = "vscode://file" . str_replace(':', '', $remoteUrl);

    @endphp 
    <a href="{{ $vscodeUrl }}" target="_blank">Open in VSCode</a>
</body>
</html>