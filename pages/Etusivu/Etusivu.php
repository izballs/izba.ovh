<ul class='selectorWrap'>
    <li class='selector selected' onClick='changeSelection(event)'>
        <div hidden>gameProject</div>
        Peliprojektit
    </li>
    <li class='selector unSelected' onClick='changeSelection(event)'>
        <div hidden>programProject</div>
        Ohjelmisto projektit
    </li>
    <li class='selector unSelected' onClick='changeSelection(event)'>
        <div hidden>webProject</div>
        Sivusto projektit
    </li>
</ul>

<ul id='projectShower'>
</ul>

<ul id='projectsHolder' hidden>
<?php
    $scandir = scandir("pages/Etusivu/Projects");
    $diff = array("..", ".");
    $scandir = array_diff($scandir,$diff);
    foreach($scandir as $file){ 
        readfile("pages/Etusivu/Projects/$file");
    }
?>
</ul>

<script>
    firstSelection();
</script>

<?php 
?>
