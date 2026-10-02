export type MediaAsset={src:string;kind:'cutout'|'photo';width:number;height:number;alt:string};
const generated=(name:string,width=1060,height=650):MediaAsset=>({src:`images/generated/${name}.png`,kind:'cutout',width,height,alt:`Generated editorial illustration: ${name}`});
const photo=(name:string,alt:string):MediaAsset=>({src:`images/web/${name}.jpg`,kind:'photo',width:name==='daring-dauntless'?552:1035,height:690,alt});
export const rasterByAsset:Record<string,MediaAsset>={
 anchor:generated('anchor',610,670),
 independence:generated('anchor',610,670),
 sail:generated('sailing-ship',850,690),
 globe:generated('globe',690,690),
 route:generated('globe',690,690),
 island:generated('numenor',1020,680),
 carrier:generated('carrier',1120,590),
 mission:generated('carrier',1120,590),
 jet:generated('f35b',1040,690),
 helicopter:generated('merlin',1120,650),
 box:generated('logistics',850,650),
 fuel:generated('logistics',850,650),
};
// Historic photographs illustrate the equipment, never presented as Highmast 2025 footage.
export const photoByScene:Record<string,MediaAsset>={
 S25:photo('queen-elizabeth','HMS Queen Elizabeth sea trials, 2017; Fleet Air Arm / MOD'),
 S28:photo('queen-elizabeth','HMS Queen Elizabeth flight deck; Fleet Air Arm / MOD'),
 S29:photo('daring-dauntless','HMS Daring and HMS Dauntless; LA(Phot) Ian Simpson / MOD'),
 S33:photo('merlin-hm2','Royal Navy Merlin HM2; Andrew Linnett / MOD'),
};
