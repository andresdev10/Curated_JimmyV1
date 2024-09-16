
import { chromium } from 'playwright';
import dotenv from 'dotenv';
// import moment from 'moment';
import moment from 'moment-timezone';
dotenv.config();

const username = process.env.USER_TWITTER;
const password = process.env.PASSWORD_TWITTER


const getData = async (username,password,url) => {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        // await page.context().clearCookies();  // Borra las cookies
        // await page.context().clearPermissions();  // Borra los permisos dados al sitio
        await page.goto(url);
        const postsArray = []

        
        const Inicio = page.locator('.css-175oi2r.r-1xpp3t0')
        const spanInicio = Inicio.locator('a.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-2yi16.r-1qi8awa.r-3pj75a.r-o7ynqc.r-6416eg.r-1ny4l3l.r-1loqt21', { strict: false})
        // await spanInicio.waitFor();

        if (spanInicio) await spanInicio.nth(0).click();

            const inputLocator = page.locator('.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7');
            if(inputLocator){
                await inputLocator.waitFor(); 
                
                await inputLocator.fill(''); 
        
                await inputLocator.fill(username);
                
                const inputValue = await inputLocator.inputValue();
        
                await page.waitForSelector('.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-184id4b.r-13qz1uu.r-2yi16.r-1qi8awa.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l', { timeout: 30000 });
        
                // const nextButtonLocator = page.locator('button:has-text("Siguiente")');
                const nextButtonLocator = page.locator('button.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-ywje51.r-184id4b.r-13qz1uu.r-2yi16.r-1qi8awa.r-3pj75a.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l', { strict: false});
                await nextButtonLocator.nth(0).waitFor({ state: 'visible' });
                await nextButtonLocator.nth(0).click();
                console.log("click");    
            }
            
            await page.waitForTimeout(5000);
    
    
            const inputPassword = page.locator('.r-30o5oe.r-1dz5y72.r-13qz1uu.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-t60dpp.r-fdjqy7')
            if (inputPassword){
                await inputPassword.waitFor()
        
                await inputPassword.fill('')
        
                await inputPassword.fill(password)
        
                const inputPasswordValue = await inputPassword.inputValue()
        
                await page.waitForTimeout(5000);
        
        
                // const buttonIniciar = page.locator('span:has-text("Iniciar sesión")').first();
                const buttonIniciar = page.locator('button.css-175oi2r.r-sdzlij.r-1phboty.r-rs99b7.r-lrvibr.r-19yznuf.r-64el8z.r-1fkl15p.r-1loqt21.r-o7ynqc.r-6416eg.r-1ny4l3l');
                await buttonIniciar.click()
                console.log("click")
            }



        // const enlaceProfile = page.locator('.css-175oi2r.r-6koalj.r-eqz5dr.r-16y2uox.r-1habvwh.r-13qz1uu.r-1mkv55d.r-1ny4l3l.r-1loqt21', { strict: false })
        // await enlaceProfile.nth(8).waitFor();
        // await enlaceProfile.nth(8).click();

        const divImg = page.locator('.css-175oi2r.r-sdzlij.r-1udh08x.r-5f1w11.r-u8s1d.r-8jfcpp', { strict:false})
        await divImg.nth(1).waitFor();
        const enlaceImg = divImg.locator('.css-175oi2r.r-1pi2tsx.r-13qz1uu.r-o7ynqc.r-6416eg.r-1ny4l3l.r-1loqt21', { strict: false })
        await enlaceImg.nth(0).waitFor();
        const hrefValue = await enlaceImg.nth(0).getAttribute('href');

        const divUserName = page.locator('.css-175oi2r.r-18u37iz.r-1w6e6rj.r-6gpygo.r-14gqq1x')
        await divUserName.waitFor();
        const spanUserName = divUserName.locator('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3', { strict: false})
        await spanUserName.nth(0).waitFor();
        const spanValue = await spanUserName.nth(0).textContent();

        const tagAFollowers = page.locator('.css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-1loqt21', { strict: false})
        const tagAFollowersHref = await tagAFollowers.nth(2).getAttribute('href');
        const spanFollowers = tagAFollowers.nth(2).locator('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3')
        const spanFollowersValue = await spanFollowers.nth(1).textContent();

        await page.waitForSelector('.css-175oi2r.r-18u37iz.r-1udh08x.r-1c4vpko.r-1c7gwzm.r-o7ynqc.r-6416eg.r-1ny4l3l.r-1loqt21');
        // Hacer scroll hacia abajo
        await page.evaluate(() => window.scrollBy(0, window.innerHeight * 2));
        
        // Esperar a que se cargue el nuevo contenido
        await page.waitForTimeout(1000); // Ajusta el tiempo si es necesario
        const divPosts = await page.locator('.css-175oi2r.r-18u37iz.r-1udh08x.r-1c4vpko.r-1c7gwzm.r-o7ynqc.r-6416eg.r-1ny4l3l.r-1loqt21').elementHandles();
        console.log("longitude: ", divPosts.length)
        const dateNow = moment().format('YYYY-MM-DD')

        for (const div of divPosts) {


            const divTime = await div.$('.css-175oi2r.r-18u37iz.r-1q142lx')

            const enlaceTime = await divTime.$('a.css-146c3p1.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-xoduu5.r-1q142lx.r-1w6e6rj.r-9aw3ui.r-3s2u2q.r-1loqt21') 
            const linkPost = await enlaceTime.getAttribute('href');
            const timeTag = await enlaceTime.$('time')
            // Recupera el valor del atributo datetime
            const datetimeValue = await timeTag.getAttribute('datetime');
            const dateNewYork = moment(datetimeValue).tz('America/New_York')
            const date = dateNewYork.format('YYYY-MM-DD');
            const time = dateNewYork.format('HH:mm:ss');

            const timeText = await timeTag.textContent();

            const divPostImg = await div.$('.css-175oi2r.r-9aw3ui.r-1s2bzr4')
            let imgPostUrl;
            let imgValue = [];
            if(divPostImg){
                imgPostUrl = await divPostImg.$('img');
                if (imgPostUrl) {
                    const imgHandle = await imgPostUrl.getProperty('src');
                    imgValue.push(await imgHandle.jsonValue()); // Obtiene el valor real del src
                }         
            } 
            const divPosts = await div.$('.css-146c3p1.r-8akbws.r-krxsd3.r-dnmrzs.r-1udh08x.r-bcqeeo.r-1ttztb7.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-bnwqim');
            let spanPosts;
            if(divPosts) spanPosts = await divPosts.$('.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3')
           
                // Obtén el texto del span
                const postsValue = spanPosts ? await spanPosts.textContent() : "";
              
                postsArray.push({
                    date: date,
                    time: time,
                    username: spanValue,
                    name: "",
                    platform: 'twitter',
                    postUrl: `https://x.com${linkPost}`,
                    contentPost: postsValue.trim(),
                    photo: `https://www.x.com${hrefValue}`,
                    followers: spanFollowersValue,
                    linkFollowers: tagAFollowersHref,
                    LinkPhotPosts: imgValue || [],
                });
            
        }  

        // console.log(postsArray);


        // Cierra el navegador
        await browser.close();
        return postsArray;

    } catch (error) {
        console.log("error", error);
        throw error;

    }
}

const twitterScraping = async (username, password, url) => {
    try {
      const data = await getData(username, password, url);
      return data
    } catch (error) {
        console.log("error", error);
    }
}

export default twitterScraping;
