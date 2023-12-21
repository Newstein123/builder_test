<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div id="divID"></div>
<div id="sendMsg"> Button </div>
<script>
   var eventSource = new EventSource("/test/ai-writing/get_message?message='write content for hero section'");
   var div = document.getElementById('divID');
   eventSource.onmessage = function (e) {
    console.log(e.data)
      if(e.data.trim() == "[DONE]")
      {
          div.innerHTML += "<br><br>Hello";
          eventSource.close();
      } else {
        try {
            // Parse the JSON data and update the content
            var jsonData = JSON.parse(e.data);
            div.innerHTML += jsonData.choices[0].delta.content;
        } catch (error) {
            // Handle the case when parsing fails (e.g., for the "Done" signal)
            console.error("Error parsing JSON:", error);
        }
    }
   };
   eventSource.onerror = function (e) {
       console.log(e);
   };
   eventSource.onclose = function (e) {
        console.log("Connection closed:", e);
    };
</script>
</body>
</html>