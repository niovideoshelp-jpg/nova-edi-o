import fs from 'node:fs';
import {geoMercator,geoNaturalEarth1,geoPath} from 'd3-geo';
import {rewind,featureCollection,bboxPolygon,greatCircle,simplify} from '@turf/turf';
const world=JSON.parse(fs.readFileSync('data/geography/world-50m.json','utf8'));
const isles=JSON.parse(fs.readFileSync('data/geography/british-isles-10m.json','utf8'));
const uk=isles.features.find(f=>f.properties.code==='GBR');
const land=featureCollection(world.features.map(f=>rewind(simplify(f,{tolerance:.025,highQuality:true}),{reverse:true})));
fs.mkdirSync('public/maps/part1',{recursive:true});
const places={London:[-.1276,51.5072],Halifax:[-63.5752,44.6488],CapeTown:[18.4241,-33.9249],Mumbai:[72.8777,19.076],Sydney:[151.2093,-33.8688],Singapore:[103.8198,1.3521],ForceZ:[104.47,3.56],NewYork:[-74.006,40.7128],Liverpool:[-2.9916,53.4084]};
const specs={world:null,atlantic:[-88,25,16,65],malaya:[97,-2,112,12]};
const output={provider:'Natural Earth public domain',processing:'Turf simplify/rewind/greatCircle; D3 projection. Coastlines only; no implied historical political borders.',places,views:{}};
for(const [name,region]of Object.entries(specs)){
 const projection=region?geoMercator().fitExtent([[100,70],[1500,750]],rewind(bboxPolygon(region),{reverse:true})):geoNaturalEarth1().fitExtent([[35,30],[1565,780]],{type:'Sphere'});
 const path=geoPath(projection);
 const paths=land.features.map(f=>path(f)).filter(Boolean).join(' ');
 const ukPath=path(rewind(uk,{reverse:true}));
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="800" viewBox="0 0 1600 800"><path d="${paths}" fill="#24475F" stroke="none"/><path d="${ukPath}" fill="#426F94" stroke="#B5CADD" stroke-width="1"/></svg>`;
 fs.writeFileSync(`public/maps/part1/${name}.svg`,svg);
 output.views[name]={points:Object.fromEntries(Object.entries(places).map(([id,p])=>[id,projection(p)])),uk:ukPath,routes:Object.entries(places).filter(([id])=>!['London','ForceZ','Liverpool'].includes(id)).map(([id,p])=>({id,d:path(rewind(greatCircle(places.London,p,{npoints:80}),{reverse:true})),from:projection(places.London),to:projection(p)}))};
}
fs.writeFileSync('data/part1/geography.json',JSON.stringify(output));
console.log('Frozen three coastline maps and geographic route coordinates');
