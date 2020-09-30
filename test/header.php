<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Juuso Yli-Sorvari</title>
        <link rel="stylesheet" href="/test/styles/default.css">
        <link rel="stylesheet" href="/test/fontawesome/css/all.css">
        <script src="/test/scripts/main.js"></script>
    </head>
    <body>
        <header id="header">
            <a id="logo" href="https://izba.ovh"><img src='img/logo.png' alt="Juuso Yli-Sorvari"></a>
            <i id="navShower" onClick="showNavi()" class="fas fa-bars"></i>
            <input type="checkbox" id="navStatus" hidden/>
            <nav>
                <a href="Etusivu" onmouseleave="colorHeaderBorder(false)" onmouseenter="colorHeaderBorder(true)" class="navItems" onClick="loadPage('Etusivu', null, null, 'false', event)">Etusivu</a>
                <a href="Ansioluettelo" onmouseleave="colorHeaderBorder(false)" onmouseenter="colorHeaderBorder(true)" class="navItems" onClick="loadPage('Ansioluettelo', null, null, 'false', event)">Ansioluettelo</a>
                <a href="Blogi" onmouseleave="colorHeaderBorder(false)" onmouseenter="colorHeaderBorder(true)" class="navItems" onClick="loadPage('Blogi', null, null, 'false', event)">Blogi</a>
                <a href="Kirjaudu" onmouseleave="colorHeaderBorder(false)" onmouseenter="colorHeaderBorder(true)" class="navItems" onClick="loadPage('Kirjaudu', null, null, 'false', event)">Kirjaudu</a>
            </nav> 
        </header>
