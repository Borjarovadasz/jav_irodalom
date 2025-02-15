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

for(let adat of fejlec) {
    const th = document.createElement('th');

    th.innerHTML = adat.szoveg
    console.log(adat);
    tr.appendChild(th);
    if(adat.szoveg == 'Szerelmek') {
        th.colSpan = 2
    }
}


function rendertable() {
    for(let i = 0; i < array.length; i++ ) { //végigiterálok egy for ciklussal az array-en
        const mostanielement = array[i]  //az i-dik element a mostanielement lesz
        const sor = document.createElement('tr') // csinálok egy sort

        tablazat.appendChild(sor) //a fő táblázathoz hozzácsatolom a sort

        const elsosor = document.createElement('td') //elsosor létrehozása
        elsosor.innerHTML = mostanielement.szerzonev //elsosor innerHTML-je a az array-ben a mostanielement (i)-nek a sor1.je
        sor.appendChild(elsosor) //hozzátesszük a sorhoz az elso oszlop elso elemjét 

        const masodiksor = document.createElement('td') //masodiksor létrehozása
        masodiksor.innerHTML = mostanielement.korszak //masodiksor innerHTML-je a az array-ben a mostanielement (i)-nek a sor2.je
        sor.appendChild(masodiksor) //hozzátesszük a sorhoz az elso oszlop masodik elemjét 

        const harmadiksor = document.createElement('td') //harmadiksor létrehozása
        harmadiksor.innerHTML = mostanielement.szerelem1 //harmadiksor innerHTML-je a az array-ben a mostanielement (i)-nek a sor3.je
        sor.appendChild(harmadiksor) //hozzátesszük a sorhoz az elso oszlop harmadik elemjét 

        if (!mostanielement.szerelem2) {
            harmadiksor.colSpan = 2 // ha nincs tudos2 akkor colspan 2
        }else {
            const negyediksor = document.createElement('td') //negyediksor létrehozása
            negyediksor.innerHTML = mostanielement.szerelem2 //negyediksor innerHTML-je a az array-ben a mostanielement (i)-nek a sor4.je
              sor.appendChild(negyediksor) //hozzátesszük a sorhoz az elso oszlop negyedik elemjét 
        }

        tbody.appendChild(sor)

}

}

rendertable()

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

    function szerzokor(ertek, uzenet) { // teridocheck függvény aminek a bemeneti paraméteri ertek és uzenet
        if (!ertek.value) { // ha az érték nek a tulajdonsága undefined vagy "" 
            const parentElement = ertek.parentElement; //akkor létrehozunk egy parentelement változot és eltároljuk a bejővő értéknek a parentelementjét
            const errormsg = parentElement.querySelector('.error'); //majd egy errormsg változóban a bejövő értéknek parentelementjében megkeressük az első error classal rendekező dolgot.
            if (errormsg) { //ha az errormsg van akkor 
                errormsg.innerHTML = uzenet; //legyen a megadott uzenetünk az
            }
        }
    }
    szerzokor(szerzo, "Szerző megadása kötelező!")
    szerzokor(korszak, "Korszak megadása kötelező!")


    if(!szerelem1ertek) { //ha a területérték megegyezik és egyelő típusú akkor
        const parentElement = szerelem1.parentElement; // a terulet mezonek a  parentelementjét eltároljuk egy változóba
        const errormsg = parentElement.querySelector('.error');  //majd ebben a parentelement div-ben megnézzük hogy van e class-al rendelkező elem
        if(errormsg != undefined) { //ha van és undefined
            errormsg.innerHTML = 'Szerelem megadasa kotelezo';  //akkor legyen az innerhtml-je ez
        }
    } 

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

    if(masodikertek == true && szerelem1ertek && !szerelem2ertek){
        const parentElement = szerelem1.parentElement; //akkor létrehozunk egy parentelement változot és eltároljuk a bejővő értéknek a parentelementjét
        const parentElement1 = szerelem2.parentElement; //akkor létrehozunk egy parentelement változot és eltároljuk a bejővő értéknek a parentelementjét
        const errormsg = parentElement.querySelector('.error'); //majd egy errormsg változóban a bejövő értéknek parentelementjében megkeressük az első error classal rendekező dolgot.
        const errormsg1 = parentElement1.querySelector('.error'); //majd egy errormsg változóban a bejövő értéknek parentelementjében megkeressük az első error classal rendekező dolgot.
        if (errormsg && errormsg1) { //ha az errormsg van akkor 
            errormsg.innerHTML = "Kötelező megadni mindkét szerelmet ha bepipálod!!"; //legyen a megadott uzenetünk az

            errormsg1.innerHTML = "Kötelező megadni mindkét szerelmet ha bepipálod!"; //legyen a megadott uzenetünk az       
            valid = false
    }else {
        valid =  true
    }
    }
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

    rendertable() // és az ujonnan belerakott dologgal ujragenerálom a táblát.
})