```mermaid
    sequenceDiagram
    participant browser
    participant server

    Note right of browser: The end user puts in contents and clicks "save".
    Note right of browser: The spa.js stops the default process with e.preventDefault().
    Note right of browser: The spa.js creates a new note, adds it in notes list and rerenders the page.

    Note right of browser: The spa.js updates new content to server side.
    
    browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server -->> browser: 201 created
    deactivate server

    Note right of browser: The browser stays on the current page without reloading.

```


