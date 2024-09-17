import { chromium } from 'playwright';
import dotenv from 'dotenv';
// import moment from 'moment';
import moment from 'moment-timezone';
dotenv.config();

const usernameInstagram = process.env.USER_INSTAGRAM;
const passwordInstagram = process.env.PASSWORD_INSTAGRAM;

const getData = async (usernameTumblr,passwordTumblr,url) => {
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage();
        // await page.context().clearCookies();  // Borra las cookies
        // await page.context().clearPermissions();  // Borra los permisos dados al sitio
        console.log(`Se ingresara a la url: ${url}`);
        // await page.goto(url);
        // await page.setJavaScriptEnabled(false)
        // await page.goto('https://www.instagram.com/artificial_and_imaginary/')
        await page.goto('https://www.instagram.com/_digital_art.ai/')
        const postsArray = []
        await page.waitForTimeout(5000);

        
        const divEntrar = page.locator('div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1d7yc3v.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib')
        await divEntrar.waitFor()
        const subDivEntrar = divEntrar.locator('div._acum')
        await subDivEntrar.waitFor()
        const divEntrar2 = subDivEntrar.locator('div._acus')
        await divEntrar2.waitFor()
        const divEntrar3 = divEntrar2.locator('div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x6s0dn4.x1oa3qoh.x1nhvcw1', { strict: false})

        await divEntrar3.nth(0).waitFor()
        const aEntrar = divEntrar3.nth(0).locator('a', { strict : false })
        await aEntrar.nth(0).waitFor()
        await aEntrar.nth(0).click()
        console.log("click")
        // const mainPrincipal = page.locator('main.xvbhtw8.x78zum5.xdt5ytf.x1iyjqo2')
        // await mainPrincipal.waitFor()
        // const divPrincipal = mainPrincipal.locator('div.x1iyjqo2.xdj266r.xkrivgy.x4n8cb0.x1gryazu.x1fawyso.x6tf39o.xc73u3c.x18d9i69.x5ib6vp.x19sv2k2.x164vai7.x13ijfrp.xhwgc15.xkvl2z1.x58vhm7')
        // await divPrincipal.waitFor()
        // const header = divPrincipal.locator('header.xrvj5dj.xpagfr2.xl463y0.x3mjgb7.xdj266r.xh8yej3')
        // await header.waitFor()
        // const seccionAvatar = header.locator('section.x6s0dn4.x78zum5.xcrlgei.xghq6j0.x1cq0mwf.x1agbcgv.xl56j7k.xqmgo2j.x16zxmhm')
        // await seccionAvatar.waitFor()
        // const divAvatar = seccionAvatar.locator('div.x6s0dn4.x78zum5.xdt5ytf.x1iyjqo2.x2lah0s.xl56j7k.x1n2onr6')
        // await divAvatar.waitFor()
        // const subDivAvatar = divAvatar.locator('div.x6s0dn4.xamitd3.x1lliihq.xl56j7k.x1n2onr6')
        // await subDivAvatar.waitFor()
        // const anchorAvatar = subDivAvatar.locator('a') 
        // await anchorAvatar.waitFor()
        // const img = anchorAvatar.locator('img');
        // await img.waitFor()
        // const imgValue = await img.getAttribute('src')
        // console.log("imgValue",imgValue)
        // await page.close();
        // return postsArray;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

// const InstagramScraping = async (usernameTumblr, passwordTumblr, url) => {
//     try {
//         const data = await getData(usernameTumblr, passwordTumblr, url);
//         return data
//     } catch (error) {
//         console.log("data", data);
//     }
// }

// export default InstagramScraping;

getData(usernameInstagram, passwordInstagram) 