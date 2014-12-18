<script><![CDATA[
var objList = [
    // All text from slides
    {id: "g3732", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "text16512", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "g20370", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "g4469", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "g20594", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "g21550", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "g20513", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
    {id: "g20423", op: 'gt', frame: 7, tvalue: 'hidden', fvalue: 'visible'},
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

