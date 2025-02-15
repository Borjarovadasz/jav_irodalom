const fejlec  = //létrehozunk egy fejléc arrayt objektumokkal
    [
        {
            szoveg: "Szerző neve	" //elso objektomunk amiben eltároljuk a szöveget
        },
        {
            szoveg: "Korszak" //második objektomunk amiben eltároljuk a szöveget
        },
        {
            szoveg: "Szerelmek", colSpan: 2 //harmadik objektomunk amiben eltároljuk a szöveget és adunk neki colspan-2 is
        }
    ]


const array = [
    {
        szerzonev : "Balassi Bálint	",
        korszak : "reformáció",
        szerelem1 : "Losonczy Anna",
        szerelem2 : "Dobó Krisztina",

    },
    {
        szerzonev : "Csokonai Vitéz Mihály	",
        korszak : "felvilágosodás",
        szerelem1 : "Vajda Juliána",
        szerelem2 : "",

    },
    {
        szerzonev : "Petőfi Sándor	",
        korszak : "magyar romantika	",
        szerelem1 : "Mednyánszky Berta	",
        szerelem2 : "Szendrey JúliaS",

    },
    {
        szerzonev : "Ady Endre		",
        korszak : "20. század	",
        szerelem1 : "Léda	",
        szerelem2 : "Csinszka",

    }
    
]

const tablazat = document.createElement('table')
const tbody = document.createElement('tbody')
const thead = document.createElement('thead')
document.body.appendChild(tablazat)
tablazat.appendChild(thead)
tablazat.appendChild(tbody)

const tr = document.createElement('tr')
thead.appendChild(tr)

headergen(tr,fejlec)

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

rendertable(array, tbody)

const form = document.getElementById('form') // megszerezzük az id alapján a formot

form.addEventListener('submit', function(e) {

    e.preventDefault(); //az alapértelmezett böngészű lefusson megakadályozza
    const szerzo = document.getElementById("kolto_nev") //elkerem a fizika idt és beteszem az itt létrehozott változóba
    const korszak = document.getElementById("korszak") //elkerem a ido idt és beteszem az itt létrehozott változóba
    const szerelem1 = document.getElementById("szerelem1") //elkerem a tudos1 idt és beteszem az itt létrehozott változóba
    const masodik = document.getElementById("masodik").checked
    const szerelem2 = document.getElementById("szerelem2") //elkerem a tudos2 idt és beteszem az itt létrehozott változóba


    const szerzoertek = szerzo.value //itt egy másik változóba belerakom az elöbb elkért terulet változó értékét

    const korszakertek = korszak.value //itt egy másik változóba belerakom az elöbb elkért idoszak változó értékét

    const szerelem1ertek = szerelem1.value //itt egy másik változóba belerakom az elöbb elkért tudos1 változó értékét

    const masodikertek = masodik

    let szerelem2ertek = szerelem2.value//itt egy másik változóba belerakom az elöbb elkért tudos2 változó értékét

    const form = e.currentTarget  
    const errorhtml = form.querySelectorAll('.error') //a formon belül mindenet aminek error classal rendelkezik beletesszük egy változoba
    for(const errorelement of errorhtml){  //minden egyes element ami ebben az errorhtml-ben van 
        errorelement.innerHTML = '' //annak legyen az innerhtml-je üres string. (igy eltűnik majd a validácios szöveg ha tényleg irunk valamit)
    }   

    let valid = true

    if(!szerzoertek || !korszakertek || !szerelem1ertek) { //hogy ha a teruletertek vagy az idoszakertek "" vagy undefined akkor a valid legyen false amúgy meg true
        valid = false //legyen false
    }else {
        valid = true //legyen true
    }
    
    if(masodikertek == true) {
        szerelem2ertek = szerelem2.value
    } else {
        szerelem2ertek = ""
    }

    alapcheck(szerzo, "Szerző megadása kötelező!")
    alapcheck(korszak, "Korszak megadása kötelező!")
    alapcheck(szerelem1, "Szerelem megadása kötelező")
   
    szerelemcheck(szerelem1, szerelem2, "Kötelez megadni mintkét szerelmet!", masodik)

        if(valid) {
            const ujadat = { // egy uj objektumot hozunk létre 
                szerzonev: szerzoertek, // az uj fizikateruletnek a teruletertek lesz az értéke
                korszak : korszakertek, // az idoszaknak az idoszakerteke lesz az értéke
                szerelem1 : szerelem1ertek, // a tudos1-nek a tudos1ertek lesz az új értéke
                szerelem2 : szerelem2ertek // a tudos2-nek a tudos2ertek lesz az új értéke
                
            }
            array.push(ujadat) //belerakjuk az arrayben ami ugye már létezik ezt az új létrehozott adatobjektumunkat.
        }
    

    form.reset()
   

    tbody.innerHTML = "" //kitörlöm a táblázatot azért a tbodyt mert abban van igazából az egész táblázat a headerrel nem kell foglalkozni.

    rendertable(array, tbody)  // és az ujonnan belerakott dologgal ujragenerálom a táblát.

})


function alapcheck(ertek, uzenet) {
    if (!ertek.value) { 
        const parentElement = ertek.parentElement; 
        const errormsg = parentElement.querySelector('.error'); 
        if (errormsg) { //ha az errormsg van akkor 
            errormsg.innerHTML = uzenet; //legyen a megadott uzenetünk az
        }
    }
}



function szerelemcheck(ertek, ertek2, uzenet, pipa ) {
    if (ertek.value && !ertek2.value && pipa == true) { 
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



