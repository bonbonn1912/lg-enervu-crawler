import "dotenv/config";
import { insertData } from "./helper/insert.js";

async function getData(cookie) {
  
    const res = await fetch("https://eu.enervu.lg-ess.com/v2/installer/systems/ess/energyflow-info", {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "start_poll": "Y",
          "x-requested-with": "XMLHttpRequest",
          "cookie": cookie,
          "Referer": "https://eu.enervu.lg-ess.com/v2/installer/dashboard.do?page=activatedSystems",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": "system_id=15341&ess_id=13540",
        "method": "POST"
      });

  const data = await res.json();
  return data;
}

async function Login(cookieWithJessionId) {
    const res = await fetch("https://eu.enervu.lg-ess.com/v2/account/login.do?lang=de", {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "max-age=0",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
        //  "cookie": "userId=; AWSELB=E5E5A77F04AF80E1407CE29B7C732664F377B120F57D1CD6358991CB1FB25BF74543FC32CCB0AD8730C8CA2180DE584D4604854598381C60CCB8E98CFB7744A393E4F8E9A3; AWSELBCORS=E5E5A77F04AF80E1407CE29B7C732664F377B120F57D1CD6358991CB1FB25BF74543FC32CCB0AD8730C8CA2180DE584D4604854598381C60CCB8E98CFB7744A393E4F8E9A3; lang=de",
          "Referer": "https://eu.enervu.lg-ess.com/v2/installer/main.do?lang=de",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": process.env.LG_LOGIN_BODY,
        "method": "POST",
        redirect: "manual"
      });
     // console.log(`Response Status: ${res.status}`); // Should log 302 for a redirect
      if (res.status === 302) {
          return res.headers.get("set-cookie");
      }else{
        console.log("Wrong credentials")
      }
  
    //  const header = res.headers.get("set-cookie");
      return header;
}

async function initalSession() {
  const res = await fetch(
    "https://eu.enervu.lg-ess.com/v2/installer/main.do?lang=de"
  );
  const header = res.headers.get("set-cookie");
  return header;
}

async function parse() {
    try{
        const cookie = await Login();
        const data = (await getData(cookie))["energyFlowList"][0]
        insertData(data)
    }catch(e){
        console.log("Could not update try in next intervall")
    }
 
}

function logEveryXSeconds(i, intervall) {
    setTimeout(() => {
        console.log("Fetching data nr: " + i)
        parse()
        logEveryXSeconds(++i);
    }, 60000)
}

logEveryXSeconds(0, 1);