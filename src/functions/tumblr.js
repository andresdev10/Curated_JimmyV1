import { chromium } from 'playwright';
import dotenv from 'dotenv';
// import moment from 'moment';
import moment from 'moment-timezone';
dotenv.config();

const usernameTumblr = process.env.USER_TUMBLR;
const passwordTumblr = process.env.PASSWORD_TUMBLR;

const getData = async (usernameTumblr,passwordTumblr,url) => {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        // await page.context().clearCookies();  // Borra las cookies
        // await page.context().clearPermissions();  // Borra los permisos dados al sitio
        console.log(`Se ingresara a la url: ${url}`);
        await page.goto(url);
        // await page.setJavaScriptEnabled(false)
        // await page.goto('https://www.tumblr.com/materterrae')
        const postsArray = []
        await page.waitForTimeout(5000);
        const divPrincipal = page.locator('div.xw7_H.M0eFR.qQC1b')
        const divSubPrincipal = divPrincipal.locator('div.N4Zk9.Hzerg')
        const countDivSubPrincipal = await divSubPrincipal.count();
        console.log("aaaa", countDivSubPrincipal)
        if(countDivSubPrincipal > 0) {
            console.log("entroooo if")
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
    
            await inputUserName.nth(0).fill(usernameTumblr)
                                                                         //TRX6J CxLjL qjTo7 CguuB qNKBC
            const buttonSiguiente = seccionInicioDeSession.locator('button.TRX6J.CxLjL.qjTo7.CguuB.qNKBC', { strict: false})
    
            await buttonSiguiente.nth(0).click();
            console.log("click")
    
            await page.waitForTimeout(5000);
            await seccionInicioDeSession.waitFor()
    
            const inputPassword = seccionInicioDeSession.locator('input.sL4Tf', { strict: false})
            await inputPassword.nth(0).waitFor();
            await inputPassword.nth(0).fill(passwordTumblr)
    
            await buttonSiguiente.nth(0).click();
            console.log("click")
        }else if (countDivSubPrincipal == 0){
            console.log("entroooo elseeee")

            const divSubPrincipal = page.locator('div.fill_container.center_wrap')
            const modalInicio = divSubPrincipal.locator('div.introduction.basic_message_text.center_item')
            const button2Inicio = modalInicio.locator('button.chrome.hefty.grey')
            await button2Inicio.click();
            console.log("click")
            await page.waitForTimeout(5000);

            const principal2 = page.locator('div.KQFN5')
            const seccion = principal2.locator('section.MGngl')
            const div2 = seccion.locator('div.NqEjV')
            const inputInicio2 = div2.locator('input.gj_Aq', { strict: false})
            await inputInicio2.nth(0).fill(usernameTumblr);
            await inputInicio2.nth(1).fill(passwordTumblr);

            const divButton = principal2.locator('div.Fygd5')

            const button2 = divButton.locator('button.TRX6J.CxLjL.qjTo7.CguuB.yC5pj')
            await button2.waitFor()
            await button2.click();
            console.log("click")
        }
        await page.waitForTimeout(5000)
        const header = page.locator('.uYpYy.undefined')
        const divHeader =  header.locator('div.u2YPL.wFAw8')

        let imgUrl;
        let userNameValue;
        if(divHeader.count() > 0){
            const img = divHeader.locator('img')
            let srcset; 
            if(img) srcset = await img.getAttribute('srcset');
    
             imgUrl = srcset.split(',').find(url => url.includes('96w')).trim().split(' ')[0];
    
    
            const divUsername = await divHeader.locator('div.F8bg3');
            const userName = await divUsername.locator('h1.vfPi2')
             userNameValue = await userName.textContent();

        }





        const main = page.locator('.gp1sd')
        const divContenedor = main.locator('div.qN8sP');

        await page.evaluate(() => window.scrollBy(0, window.innerHeight * 6));
        await page.waitForTimeout(5000)

        // const divPosts = await divContenedor.locator('div.c79Av').elementHandles();
        const divPosts = await divContenedor.locator('.FtjPK.r0etU').elementHandles();
        for (const element of divPosts) {
        let imgValue = [];
        let combinedPValue = '';
        let video = [];

            const head = await element.$('.BjErQ.PpzOx')

            const divImgAvatar = await head.$('div.RYkKH')
            const subdivImg = await divImgAvatar.$('div.nZ9l5')
            const divImgValue = await subdivImg.$('div.j4akp')
            const divImgValue1 = await divImgValue.$('div.ESMam.ntiBu')
            const divImgValue2 = await divImgValue1.$('div.HsI7c')

            await page.waitForTimeout(5000)

            const imgAvatar = await divImgValue2.$('img')
            const avatar = await imgAvatar.getAttribute('srcset')
            imgUrl = avatar.split(',').find(url => url.includes('96w')).trim().split(' ')[0];
            

            const divTime = await head.$('div.q4Pce.J_Wh8')

            const subDivTime = await divTime.$('div.ZJdm4')

            const divUserName = await subDivTime.$('div.ffqNn')
            const subDivUserName = await divUserName.$('div.WJ6ij')

            const spanUserName = await subDivUserName.$('span.W9hfZ')
            const spanUserName1 = await spanUserName.$('span.W9hfZ')
            const aUserName = await spanUserName1.$('a.zHhsx.BSUG4')
            userNameValue = await aUserName.textContent();


            const divContenedor = await subDivTime.$('div.pVS0A.T28Qk')
            
           
            await divContenedor.waitForSelector('time.M_e0U.j8f9p')
            const timeElement = await divContenedor.$('time.M_e0U.j8f9p');

            const datetime = await timeElement.evaluate(el => el.getAttribute('datetime'));
           
            const dateNewYork = moment(datetime).tz('America/New_York')
            const date = dateNewYork.format('YYYY-MM-DD');
            const time = dateNewYork.format('HH:mm:ss');
         

            const bodyPosts = await element.$('div.VDRZ4')
            const divPosts = await bodyPosts.$('div.Qb2zX')
            const spanPosts = await divPosts.$('span')

            
            const div = await spanPosts.$('div.GzjsW')

            const divVideo = await div.$('div.LbyNj')
            if(divVideo){
                const subDivVideo = await divVideo.$$('div.gDuxW')
                if(subDivVideo.length > 0) {
                    for(const sub of subDivVideo){
                        const videoTag = await sub.$('video')
                        const source = await videoTag.$('source')
                        const videoValue = await source.getAttribute('src')
                        video.push(videoValue);
                    }
                }
            }
            
            await page.waitForTimeout(5000)
            const divImg = await div.$$('div.CQmeg')
            const divText = await div.$$('div.k31gt')
            // const listText = await div.$('.RihjV')
            // if ( await listText.count() > 0) {
            //     const liTexts = listText.$$('.k31gt')
                
            // }
            console.log("divimg", divImg.length)
            if(divImg.length > 0){
                for (const row of divImg){
                        const divPrincipalImg = await row.$('div.HsI7c')
                        const imgPosts = await divPrincipalImg.$('img');
                        const imgUrl = await imgPosts.getAttribute('srcset')
                        imgValue.push(imgUrl.split(',')
                                    .find(url => {
                                        const match = url.match(/(\d+)w/); // Busca el número seguido de 'w'
                                        if (match) {
                                        const width = parseInt(match[1], 10); // Extrae el número y lo convierte a entero
                                        return width >= 100 && width <= 1120; // Verifica si está en el rango
                                        }
                                        return false; // Si no hay número, no lo toma
                                    }).trim().split(' ')[0]);

                }
            }
            if(divText.length != 0){
                for (const row of divText){
                    const p = await row.$('p')
                    const span = await row.$('span')
                    const h2 = await row.$('h2')
                    const h1 = await row.$('h1')
                    let em;
                    let small;
                    let strong;
                    if(p){
                         em = await p.$('em')
                         small = await p.$('small')
                         strong = await p.$('strong')
                    }
                    const pValue = p ? await p.textContent() :  span ? await span.textContent() : em ? await em.textContent() : small ? small.textContent() : h2 ? await h2.textContent() : strong ? await strong.textContent() : h1 ? await h1.textContent() : "";
               

                    if(divText.length === 1){
                        combinedPValue = pValue ; 
                    }else {
                         combinedPValue += pValue + ' '

                    }
                }   
            } else {
                combinedPValue = "";
            }
            


            postsArray.push({
                date: date,
                time: time,
                username: userNameValue,
                name: "",
                platform: 'tumblr',
                postUrl: "",
                contentPost: combinedPValue.trim(),
                photo: imgUrl,
                followers: "",
                linkFollowers: "",
                LinkPhotPosts:  imgValue,
                linkVideo: video
            });

        }


        // console.log("postsArray", postsArray)


        await page.close();
        return postsArray;
    } catch (error) {
        console.log("error", error);
        throw error;
    }
}

const tumblrScraping = async (usernameTumblr, passwordTumblr, url) => {
    try {
        const data = await getData(usernameTumblr, passwordTumblr, url);
        return data
    } catch (error) {
        console.log("data", data);
    }
}

export default tumblrScraping;

// getData(usernameTumblr, passwordTumblr) 