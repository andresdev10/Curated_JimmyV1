// // import { chromium } from "playwright-extra"
// import { chromium } from 'playwright';
// import moment from "moment"
// import dotenv from 'dotenv';

// // import stealth from "playwright-extra-plugin-stealth";

// // // Agregar el plugin stealth para evitar la detección de bots
// // chromium.use(stealth());

// dotenv.config();


// const username = process.env.USER_TWITTER

// const getData = async (username) => {
//     try {
//         const browser = await chromium.launch({ headless: false });
//         const page = await browser.newPage();
//         await page.goto('https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZXMifQ%3D%3D%22%7D');
//         const data = await page.$eval('.css-175oi2r.r-13awgt0.r-12vffkv', async (doc, username) => {
      
//         const contextLogin = doc.querySelector('.css-175oi2r.r-1ny4l3l.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv.r-1awozwy')
      
//         const modalLogin = contextLogin.querySelector('.css-175oi2r.r-1wbh5a2.r-htvplk.r-1udh08x.r-1867qdf.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1')
  
//         const div = modalLogin.querySelector('.css-175oi2r.r-kemksi.r-16y2uox.r-1wbh5a2')
    
//         await new Promise(resolve => setTimeout(resolve, 2000));
//         const div2 = div.querySelector('.css-175oi2r.r-1mmae3n.r-1e084wi.r-13qz1uu')
      

//         const input = div2.querySelector('.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7')
//         console.log("input", input)
//         const button = div.querySelector('button.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-184id4b.r-13qz1uu.r-2yi16.r-1qi8awa.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l')
//         console.log("button", button)
//         // Rellena el input con el valor deseado
//         const inputEvent = new Event('input', { bubbles: true });
//         input.value = username
//         input.dispatchEvent(inputEvent);
        
//         await new Promise(resolve => setTimeout(resolve, 5000));

//         // Haz clic en el botón
//         await button.click();
//         console.log("click")
       
        
//         await new Promise(resolve => setTimeout(resolve, 5000));

//         // const inputPassword = div2.querySelector('input.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7')
//         // console.log("inputPassword", inputPassword)

//         // const button2 = div.querySelector('button.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-184id4b.r-13qz1uu.r-2yi16.r-1qi8awa.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l')
//         // console.log("button2", button2)

//         // inputPassword.value ='Fall23!@#'

//         // await new Promise(resolve => setTimeout(resolve, 5000));

//         // await button2.click();
      
//         }, username)
//         // await browser.close();
//     } catch (error) {
//         console.log("error", error);
//         throw error;
//     }
// }

// getData(username)

import { chromium } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.USER_TWITTER;
const password = process.env.PASSWORD_TWITTER
const getData = async (username,password) => {
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJsYW5nIjoiZXMifQ%3D%3D%22%7D');
        
        // Espera a que el campo de entrada esté visible
        const inputLocator = page.locator('.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7');
        await inputLocator.waitFor(); // Espera a que el input esté disponible
        
        // Limpia el valor del input si es necesario
        await inputLocator.fill(''); // Limpiar el campo primero, si necesario

        // Rellena el input con el valor deseado
        await inputLocator.fill(username);
        
        // Verifica el valor del input para asegurarse de que se ha establecido correctamente
        const inputValue = await inputLocator.inputValue();
        console.log("Input Value:", inputValue);

        // Selecciona el botón 'Siguiente'
        const nextButtonLocator = page.locator('button:has-text("Siguiente")');
        await nextButtonLocator.click();
        console.log("click");
        
        // Espera un tiempo para ver los resultados después del click
        await page.waitForTimeout(5000);


        const inputPassword = page.locator('.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7')
        await inputPassword.waitFor()

        await inputPassword.fill('')

        await inputPassword.fill(password)

        const inputPasswordValue = await inputPassword.inputValue()
        console.log("inputPasswordValue", inputPasswordValue)

        await page.waitForTimeout(5000);


        const buttonIniciar = page.locator('span:has-text("Iniciar sesión")').first();
        await buttonIniciar.click()
        console.log("click")


        
        // Cierra el navegador
        // await browser.close();
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

getData(username, password);
