import {AbsoluteFill, Img, useCurrentFrame, staticFile} from 'remotion';
import styled from '@emotion/styled';
const Field=styled.div({position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 42%, #173551 0%, #0B1A2E 58%, #07111E 100%)'});
export const Background=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill><Field/><Img src={staticFile('grain.png')} style={{position:'absolute',left:-10,top:-10,width:1940,height:1100,opacity:.035,transform:`translate(${Math.floor(f/3)%4}px,${Math.floor(f/5)%4}px)`}}/><AbsoluteFill style={{background:'radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,.36) 100%)'}}/></AbsoluteFill>;
};
