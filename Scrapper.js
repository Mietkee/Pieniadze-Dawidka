let puppeteer = require('puppeteer-extra');
let pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());
puppeteer = require('puppeteer')

let otwarteSkrzynki = [];
let siano = [];
let pieniadze = [];
let zGrade = [];
let skrzynki = [
    ["FLASH", 0.55],
    ["VIRUS", 8.50],
    ["PHEONIX", 4.50],
    ["ALERT", 49.00],
    ["GALAXY", 2.00],
    ["TOOTH", 10.37],
    ["BUBBLE", 14.43],
    ["HIVE", 8.16],
    ["STRIKE", 5.98],
    ["SPLITER", 17.38],
    ["VISION", 31.28],
    ["TOXIC", 1.69],
    ["OMEGA", 12.46],
    ["DREAM", 24.73],
    ["DIABLO", 1.42],
    ["SHADOW", 3.58],
    ["ICE BLAST", 0.40],
    ["DEADPOOL", 11.80],
    ["ROCKET RACCON", 0.45],
    ["BATMAN", 1.90],
    ["VENOM", 23.40],
    ["THANOS", 5.60],
    ["IRONMAN", 3.80],
    ["CAPTAIN AMERICA", 8.80],
    ["THOR", 2.40],
    ["HULK", 6.10],
    ["VEST", 227.64],
    ["SERPENT", 69.42],
    ["ARROW", 149.84],
    ["LORE", 499.99],
    ["VICE", 299.73],
    ["BLOODSHOT", 400.00],
    ["TERRORIST", 2.80],
    ["NICE SHOT", 9.50],
    ["VIPER", 5.00],
    ["MASTER", 4.00],
    ["MARKER", 1.20],
    ["CRIMSON EMERALD", 12.50],
    ["THE EXPENDABLES", 16.15],
    ["DRAGON", 4.91],
    ["PIKA PIKA", 4.62],
    ["AVALANCHE", 0.93],
    ["SPIDER", 8.00],
    ["TEETH", 0.71],
    ["MAFIA", 3.80],
    ["GRADIENT", 3.92],
    ["BEAST", 0.65],
    ["BUMBLEBEE", 28.30],
    ["LAZURE", 1.90],
    ["JOKER", 50.00],
    ["BULLET", 1.42],
    ["BANANA", 1.36],
    ["RAZOR", 11.00],
    ["AK-47", 5.00],
    ["AWP", 4.40],
    ["KNIVES", 95.00],
    ["GLOVES", 161.00],
    ["AGENT", 1.35],
    ["GLOCK-18", 1.40],
    ["M4", 4.84],
    ["USP-S", 1.50],
    ["NEW KNIVES", 120.00],
    ["MILSPEC", 0.30],
    ["RESTRICTED", 1.90],
    ["COVERT", 6.90]];


async function hajsDawidka(url) {

     const browser = await puppeteer.launch({headless: false});
     const page = await browser.newPage();
     await page.goto(url);


     for (let i = 1; i < 55; i++) {
         //Sciąganie wartości Upgrade/Sold/Received
         await page.waitForXPath("/html/body/main/div/section/ul/li["+ i +"]/div/div[2]/div[1]/text()"); //czekanie aż załaduje się poszczególny obiekt
         const [el2] = await page.$x("/html/body/main/div/section/ul/li["+ i +"]/div/div[2]/div[1]/text()");
         const src = await el2.getProperty('textContent');
         let srcTxt = await src.jsonValue();
         siano.push(srcTxt);  //kocham cie dziala

         //Sprawdzenie jaka to skrzynka
         const [el3] = await page.$x("/html/body/main/div/section/ul/li["+ i +"]/div/div[3]/div[1]/a");
         const grade = await el3.getProperty('textContent');
         let wGrade = await grade.jsonValue();
         zGrade.push(wGrade);

         for (let j = 1; j < 66; j++) {
             if (zGrade[i - 1] == skrzynki[j - 1][0]) {
                 otwarteSkrzynki.push(skrzynki[j - 1][1]);
                 //console.log(otwarteSkrzynki)
             }
         }
        

         if (siano[i - 1] == 'Received' || siano[i - 1] == "Sold") {
             //Wpisanie ceny poszczególnego skina 
             const [el] = await page.$x("/html/body/main/div/section/ul/li[" + i + "]/div/div[2]/div[2]");
             const txt = await el.getProperty('textContent');
             let rawTxt = await txt.jsonValue();
             
             rawTxt = rawTxt.replace(/,/g, '.');
             let hajs = parseFloat(rawTxt).toFixed(2);
             pieniadze.push(hajs);

             await page.evaluate(_ => {
                 window.scrollBy(0, 150);
             });
         }
         else {
             //console.log("jestem jebanym debilem");
             await page.evaluate(_ => {
                 window.scrollBy(0, 150);
             });
         }
        }

    //Obilacznie całości wyjebanego hajsu 
     let cwel = pieniadze.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
     cwel = cwel * 3.71;
     console.log("Dawidek Wyjebał " + cwel.toFixed(2) + " PLN");
     
     //Obliczanie Cen Skrzynek
    let chuj = otwarteSkrzynki.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    chuj = chuj * 3.71
    console.log("Dawidek Zarobił " + chuj.toFixed(2) + " PLN");

     //Obliczanie na Plus
     let pizda = chuj - cwel;
     console.log("Dawidek jest na plusie " + pizda.toFixed(2) + " PLN");
    browser.close();
}

hajsDawidka("https://key-drop.com/pl/user/profile/76561199057737681")