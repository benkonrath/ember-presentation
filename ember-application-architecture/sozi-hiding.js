<script><![CDATA[
var objList = [
    // Extra Models
    {id: "g12692", op: 'gt', frame: 4,  tvalue: 'visible', fvalue: 'hidden'},
    // Model, Controller, View slide text
    {id: 'g23228', op: 'bw2', frame1: 1, frame2: 6, frame3: 8, frame4: 10, tvalue: 'visible', fvalue: 'hidden'},
    // MCV Letters
    {id: 'g23420', op: 'bw2', frame1: 1, frame2: 6, frame3: 8, frame4: 10, tvalue: 'hidden', fvalue: 'visible'},
    // hide/show comment screenshots
    {id: 'g25248', op: 'bw', frame1: 16, frame2: 24, tvalue: 'visible', fvalue: 'hidden'},
    {id: 'g25252', op: 'bw', frame1: 16, frame2: 24, tvalue: 'visible', fvalue: 'hidden'},
    // actions on router
    {id: 'g57067', op: 'gt', frame: 21, tvalue: 'visible', fvalue: 'hidden'},
    // C V actions code
    {id: 'g49231', op: 'bw', frame1: 19, frame2: 22, tvalue: 'visible', fvalue: 'hidden'},
    // C V letters
    {id: 'g49337', op: 'bw', frame1: 19, frame2: 22, tvalue: 'hidden', fvalue: 'visible'},
    // Actions text
    {id: 'text14164-5-4', op: 'gt', frame: 16, tvalue: 'visible', fvalue: 'hidden'},
    // Last - name / email.
    {id: 'g39740', op: 'gt', frame: 24, tvalue: 'visible', fvalue: 'hidden'},
];

function processShowHide(index) {
    for (var i = 0; i < objList.length; i++) {
        if (objList[i].op == 'gt') {
            if (index > objList[i].frame) {
                document.getElementById(objList[i].id).style.visibility = objList[i].tvalue;
            } else {
                document.getElementById(objList[i].id).style.visibility = objList[i].fvalue;
            }
        } else if (objList[i].op == 'bw2') {
            // Assumes frame1 is less than frame2 and frame3 is less than frame4
            if ((index > objList[i].frame1 && index < objList[i].frame2) || (index > objList[i].frame3 && index < objList[i].frame4)) {
                document.getElementById(objList[i].id).style.visibility = objList[i].tvalue;
            } else {
                document.getElementById(objList[i].id).style.visibility = objList[i].fvalue;
            }
        } else if (objList[i].op == 'bw') {
            // Assumes frame1 is less than frame2
            if ((index > objList[i].frame1 && index < objList[i].frame2)) {
                document.getElementById(objList[i].id).style.visibility = objList[i].tvalue;
            } else {
                document.getElementById(objList[i].id).style.visibility = objList[i].fvalue;
            }
        }
    }
}

sozi.events.listen("sozi.player.framechange", function (index) {
    processShowHide(index)
});

sozi.events.listen('sozi.document.ready', function () {
    processShowHide(sozi.location.getFrameIndex())
});
]]></script>

