
/**Ez egy formgenerálás ami egy arrayt kapva bemeneti értékként legenerálja nekünk a táblázatot
 * 
 * @param {Array} arrayform 
 */
function formgen(arrayform) { //formgenerate függvény létrehozása
    const form = document.createElement('form') //csinálom egy form változó alatt egy formot
    form.id = 'form'  // a form id-je legyen form
    
    for(let i = 0; i < arrayform.length; i++) { //végig iterálunk a form1 arrayünkön
        const div = document.createElement('div') //csinálunk egy div-et div névvel
        
        const label = document.createElement('label') //csinálunk egy labelt-
        label.htmlFor = arrayform[i].for //a label-nek a "fos"-os tulajdonság értéke az legyen mindig az adott ciklus i-nek az arrayben a "for"-hoz hozzákapcsolt érték.
        label.innerText = arrayform[i].label//a label-nek legyen az innerhtml-je az adott ciklis i-nek az arrayban a "label"-hez kapcsolt érték.

        const input = document.createElement('input') //csinálunk egy inputot
        
        input.id = arrayform[i].id //az input id-je legyen mindig az arrayban az id tulajdonság mögötti értékek valamelyik attól függ hol tartunk az iterácion. 
        input.name = arrayform[i].id //az input name-je legyen szintén ugyan az mint az id mert az ugyan az.
        input.type = 'text' //az input typeja legyen text
        if(arrayform[i].label == "Volt másik szerelme?"){ //megnézzük hogy ha az arrayformon  belül az egyik labelnek az a neve hogy "volt másik szerelme"
            input.type = 'checkbox' //akkor az ottani input type az legyen checkbox
        }

        const br = document.createElement('br') // csinálunk egy br-t hogy ne legyn csúnya és ne legyen olyan közel egymáshoz minden
        div.appendChild(label) //a fődivunkhöz hozzátesszük a labelt amiben már van sok minden (for, innerhtml)
        div.appendChild(br) //a fődivunkhöz hozzátesszük a br-t hogy itt mér tényleg lássuk hogy szép lesz
        div.appendChild(input) //a fődivunkhöz az inputot amiben itt is már van (id,name,type)

        const errordivecske = document.createElement('div') //csináluk egy divet errordiv névvel

        errordivecske.className = 'error' //az errordivnek a classneve az legyen "error"
        div.appendChild(errordiv) //majd szépen hozzátesszük a fődivhez ezt az uj divet. Persze mivel egy forcikluson belül vagyunk ebből is sok lesz vagyis amilyen hosszú az arrayünk.

 
    
        form.appendChild(div)//majd végül a fődivet amiben van már label, input, br, errordiv is hozzátesszük a formhoz.
    }
    const button = document.createElement('button') //csinálunk egy gombot
   button.innerHTML = "Hozzáadás" //a gombnak legyen az innerhtml-je a "Hozzáadás"
   document.body.appendChild(form) //a bodyhoz hozzátesszük a formot
   form.appendChild(button) //majd a gombot pedig a formhoz
}

/**Ez generálja nekünk le a tableünket egy array segítségével és egy tbody bemeneti paraméterrel.
 * 
 * @param {Array} arrayobjek 
 * @param {HTMLTableSectionElement} theholder 
 */

function rendertable(arrayobjek, theholder) {
    for(let adat of arrayobjek) { //végigiterálok egy for ciklussal az array-en
        const sor = document.createElement('tr') // csinálok egy sort

        theholder.appendChild(sor) //a fő táblázathoz hozzácsatolom a sort

        const elsocella = document.createElement('td') //elsocella létrehozása
        elsocella.innerHTML = adat.szerzonev //elsocella innerHTML-je a az array-ben a mostanielement (i)-nek a szerzoneve
        sor.appendChild(elsocella) //hozzátesszük a sorhoz az elso oszlop elso elemjét 

        const masodikcella = document.createElement('td') //masodikcella létrehozása
        masodikcella.innerHTML = adat.korszak //masodikcella innerHTML-je a az array-ben a mostanielement (i)-nek a korszak.ja
        sor.appendChild(masodikcella) //hozzátesszük a sorhoz az elso oszlop masodik elemjét 

        const harmadikcella = document.createElement('td') //harmadikcella létrehozása
        harmadikcella.innerHTML = adat.szerelem1 //harmadikcella innerHTML-je a az array-ben a mostanielement (i)-nek a szerelem1.je
        sor.appendChild(harmadikcella) //hozzátesszük a sorhoz az elso oszlop harmadik elemjét 

        if (!adat.szerelem2) {
            harmadikcella.colSpan = 2 // ha nincs tudos2 akkor colspan 2
        }else {
            const negyedikcella = document.createElement('td') //negyedikcella létrehozása
            negyedikcella.innerHTML = adat.szerelem2 //negyedikcella innerHTML-je a az array-ben a mostanielement (i)-nek a szerelem2.je
              sor.appendChild(negyedikcella) //hozzátesszük a sorhoz az elso oszlop negyedik elemjét 
        }

        theholder.appendChild(sor)

}

}
/**Ez csak simán megnézzük hogy ha nincs beírva valahova érték akkor kiírjuk az adott mező alá
 * hogy kötelező azt beírni.
 * 
 * @param {HTMLElement} ertek 
 * @param {string} uzenet 
 */
function alapcheck(ertek, uzenet) {
    if (!ertek.value) { 
        valid = false
        const parentElement = ertek.parentElement; 
        const errormsg = parentElement.querySelector('.error'); 
        if (errormsg) { //ha az errormsg van akkor 
            errormsg.innerHTML = uzenet; //legyen a megadott uzenetünk az
        }
    }

}

/**
 * Ez a függvény megnézi hogy ha be van pipálva viszont a második szerelem nincs megadva akkor kiírjuk hogy ez nem jó.
 * @param {HTMLElement} ertek 
 * @param {HTMLElement} ertek2 
 * @param {string} uzenet 
 * @param {logical} pipa 
 */
function szerelemcheck(ertek, ertek2, uzenet, pipa ) {
    if (ertek.value && !ertek2.value && pipa == true) {  //ha van első szerelem és a pipa be van nyomva de viszont nincs második szerelem
        const parentElement = ertek.parentElement;  
        const parentElement1 = ertek2.parentElement; 
        const errormsg = parentElement.querySelector('.error'); 
        const errormsg1 = parentElement1.querySelector('.error'); 
        if (errormsg) { //ha az errormsg van akkor 
            errormsg.innerHTML = uzenet; //legyen a megadott uzenetünk az
            errormsg1.innerHTML = uzenet; //legyen a megadott uzenetünk az
        }
    }
}
/**
 * Ez a headergen megcsinálja nekünk a fejlécünket. Bemeneti értéke a sorunk és egy array az értékekkel.
 * @param {HTMLTableRowElement} sor 
 * @param {Array} fejlecobjk 
 */
function headergen(sor, fejlecobjk) {
    for(const adat of fejlecobjk) { // for ciklussal az az adatokat nézzük az objektumból
        const cella = document.createElement('th')//létrehozunk egy  TH-T
        cella.innerHTML = adat.szoveg // a th elem belső HTML-jét az aktuális adat értékére állítjuk

        sor.appendChild(cella) // hozzáadjuk a sorhoz

        if(adat.colSpan) { //hogyha a adat a harmadik elem akkor legyen colspan 2
            cella.colSpan = adat.colSpan // colSpan beállítása a th elemre
        }
    }
}

