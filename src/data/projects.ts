export type Project = {
 slug:string; name:string; location:string; sector:string; system:string; capacity:string; client:string; page:number;
};
export const projects: Project[] = [
{slug:'uiic',name:'United India Insurance',location:'Commercial headquarters',sector:'Workplace',system:'Chilled water cooling',capacity:'800',client:'PSK Groups',page:15},
{slug:'stanley',name:'Stanley Government Hospital',location:'Chennai, Tamil Nadu',sector:'Healthcare',system:'VRF + direct expansion',capacity:'950',client:'PSK Groups',page:18},
{slug:'srm',name:'SRM University',location:'Ramapuram, Chennai',sector:'Education',system:'Variable refrigerant flow',capacity:'425',client:'SRM University',page:17},
{slug:'relevantz',name:'Relevantz',location:'Chennai One',sector:'Workplace',system:'AHU + variable refrigerant flow',capacity:'400',client:'ADROIT',page:21},
{slug:'kryon',name:'KRYON',location:'Sri City',sector:'Industrial',system:'Chilled water cooling',capacity:'380',client:'KRYON',page:16},
{slug:'hanon',name:'Hanon Systems',location:'Industrial facility',sector:'Industrial',system:'Variable refrigerant flow',capacity:'150',client:'ADROIT',page:19},
{slug:'green-coconut',name:'Green Coconut Resort',location:'Muttukadu',sector:'Hospitality',system:'VRF + direct expansion',capacity:'200',client:'J M A',page:20},
{slug:'castwel',name:'CASTWEL',location:'Industrial facility',sector:'Industrial',system:'VRF + direct expansion',capacity:'300',client:'CASTWEL',page:22},
{slug:'sathya',name:'Sathya Autoparts',location:'Thirumudivakkam',sector:'Industrial',system:'Variable refrigerant flow',capacity:'150',client:'Sathya Autoparts',page:23},
{slug:'sundaram',name:'Sundaram Clayton',location:'Padi, Chennai',sector:'Industrial',system:'Direct expansion units',capacity:'100',client:'TVS',page:24},
{slug:'sterling',name:'Sterling Resorts',location:'Salem',sector:'Hospitality',system:'Variable refrigerant flow',capacity:'110',client:'Sterling Resorts',page:25},
{slug:'gurit',name:'GURIT',location:'Oragadam',sector:'Industrial',system:'VRF + direct expansion',capacity:'120',client:'ADROIT',page:26},
{slug:'ngc',name:'NGC Energy',location:'Nellore',sector:'Industrial',system:'Variable refrigerant flow',capacity:'100',client:'ADROIT',page:27}
];
export const sectors=['All','Workplace','Healthcare','Education','Industrial','Hospitality'];
export const services=[
{name:'HVAC',label:'Climate, considered.',description:'Climate control engineered around the space. VRF, chilled water, direct expansion, air handling, ventilation, heat recovery and cold storage.',code:'01 / CLIMATE',color:'#254fff'},
{name:'Electrical',label:'Power with purpose.',description:'Electrical engineering coordinated with the wider building-services system and the needs of your project.',code:'02 / POWER',color:'#e59131'},
{name:'Extra low voltage',label:'Connections that matter.',description:'Extra-low-voltage services connected to the technical requirements of the building and its wider engineering infrastructure.',code:'03 / CONNECTION',color:'#976fe8'},
{name:'Public health',label:'Essential by design.',description:'Public health engineering integrated into the building-services scope, from design coordination through execution.',code:'04 / WATER',color:'#168d93'},
{name:'Fire fighting',label:'Safety at the centre.',description:'Fire-fighting services form part of our integrated MEP offering, with safety central to project execution.',code:'05 / SAFETY',color:'#dc563e'},
{name:'Building management',label:'Systems in sync.',description:'Building management systems connect services in a coordinated control environment. Smart-living integration is also part of our portfolio.',code:'06 / CONTROL',color:'#64764b'}
];
