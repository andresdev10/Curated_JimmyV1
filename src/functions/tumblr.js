import { chromium } from 'playwright';
import dotenv from 'dotenv';
// import moment from 'moment';
import moment from 'moment-timezone';
dotenv.config();

const username = process.env.USER_TUMBLR;
const password = process.env.PASSWORD_TUMBLR;

const getData = async (username,password,url) => {
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        // await page.context().clearCookies();  // Borra las cookies
        // await page.context().clearPermissions();  // Borra los permisos dados al sitio
        // await page.goto(url);
        await page.goto('https://www.tumblr.com/4whimsicalwanderweekendblog')
        const postsArray = []

        const divPrincipal = page.locator('div.xw7_H.M0eFR.qQC1b')
        const divSubPrincipal = divPrincipal.locator('div.N4Zk9.Hzerg')
        const buttonInicioDeSession = divSubPrincipal.locator('button.TRX6J.CxLjL.qjTo7.IMvK3')

        await buttonInicioDeSession.click();
        console.log("click")
        const contenedorInicioDeSession = page.locator('div.yKniX')
        const modalInicioDeSession = contenedorInicioDeSession.locator('div.WAHT_')
        const seccionInicioDeSession = modalInicioDeSession.locator('div.ehOK3')

        const buttonInicio = seccionInicioDeSession.locator('button.dKGjO')

        await buttonInicio.click();
        console.log("click")

        const inputUserName = seccionInicioDeSession.locator('input.sL4Tf', { strict: false})

        await inputUserName.nth(0).fill(username)
                                                                     //TRX6J CxLjL qjTo7 CguuB qNKBC
        const buttonSiguiente = seccionInicioDeSession.locator('button.TRX6J.CxLjL.qjTo7.CguuB.qNKBC', { strict: false})

        await buttonSiguiente.nth(0).click();
        console.log("click")

        const inputPassword = seccionInicioDeSession.locator('input.sL4Tf', { strict: false})

        await inputPassword.nth(1).fill(password)

        await buttonSiguiente.nth(0).click();
        console.log("click")

        const header = page.locator('.uYpYy.undefined')
        const divHeader = header.locator('div.u2YPL.wFAw8')

        const img = divHeader.locator('img')
        const srcset = await img.getAttribute('srcset');

        const imgUrl = srcset.split(',').find(url => url.includes('96w')).trim().split(' ')[0];

        console.log("URL de 96w:", imgUrl);

        const divUsername = divHeader.locator('div.F8bg3');
        const userName = divUsername.locator('h1.vfPi2')
        const userNameValue = await userName.textContent();

        console.log("userNameValue", userNameValue)


        await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));

        const divPosts = page.locator('.FtjPK.r0etU')





        // await page.close();
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

getData(username, password) 