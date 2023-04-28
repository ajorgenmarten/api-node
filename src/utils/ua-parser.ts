import uaParser from "ua-parser-js";
import { Request } from "express";

export const toUserSession = (userAgent?: string):string  => {
    const { ua, browser, os, device } = uaParser(userAgent)
    let name = ''

    if(device?.vendor) name += `${device.vendor} `
    if(device?.model) name += `${device.model}, `
    if(os?.name) name += `${os.name} `
    if(os?.version) name += `version: ${os.version}; `
    if(browser?.name) name += `${browser.name} `
    if(browser?.major) name += `(v${browser.major})`
    if(!name) name = ua

    return name
}

export const userAgentExtract = (req:Request) => req.header('user-agent')||"Not have set user-agent"