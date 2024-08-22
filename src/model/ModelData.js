import AbsoluteReality from '../components/assets/model/AbsoluteReality.png';
import AlbedoBase from '../components/assets/model/AlbedoBase.jpeg';
import Analog from '../components/assets/model/Analog.jpeg';
import Animagine from '../components/assets/model/Animagine.jpeg';
import AnimeDiffusion from '../components/assets/model/Anime Diffusion.jpeg';
import AniMesh from '../components/assets/model/AniMesh.jpeg';
import CounterfeitXL from '../components/assets/model/CounterfeitXL.jpeg';
import CyberRealistic from '../components/assets/model/CyberRealistic.jpeg';
import DarkSushi from '../components/assets/model/Dark Sushi.jpeg';
import DreamShaper from '../components/assets/model/DreamShaper.png';
import DynaVision from '../components/assets/model/DynaVision.jpeg';
import ICBINP from '../components/assets/model/ICBINP.jpeg';
import InfiniAnimeXL from '../components/assets/model/InfiniAnimeXL.jpeg';
import JuggernautXL from '../components/assets/model/JuggernautXL.jpeg';
import LahMysterious from '../components/assets/model/Lah Mysterious.jpeg';
import LEOSAM from '../components/assets/model/LEOSAM.jpeg';
import majicMIX from '../components/assets/model/majicMIX.jpeg';
import NeverEnding from '../components/assets/model/NeverEnding.jpeg';
import PerfectDeliberate from '../components/assets/model/PerfectDeliberate.jpeg';
import Photon from '../components/assets/model/Photon.jpeg';
import ProtoVision from '../components/assets/model/ProtoVision.jpeg';
import RealCartoonXL from '../components/assets/model/RealCartoonXL.jpeg';
import RealVisXL from '../components/assets/model/RealVisXL.jpeg';
import SDVN7 from '../components/assets/model/SDVN7.jpeg';
import SereneXL from '../components/assets/model/SereneXL.jpeg';

const ModelData = {

    // 'all': [
    //     { title: "DreamShaper v8", category: "3D", image: DreamShaper, id: "urn:air:sd1:checkpoint:civitai:4384@128713" },
    //     { title: "NeverEnding Dream", category: "3D", image: NeverEnding, id: "urn:air:sd1:checkpoint:civitai:10028@64094" },
    //     { title: "PerfectDeliberate", category: "3D", image: PerfectDeliberate, id: "urn:air:sd1:checkpoint:civitai:24350@253055" },
    //     { title: "DynaVision XL", category: "3D", image: DynaVision, id: "urn:air:sdxl:checkpoint:civitai:122606@297740" },
    //     { title: "AlbedoBase XL", category: "3D", image: AlbedoBase, id: "urn:air:sdxl:checkpoint:civitai:140737@329420" },
    //     { title: "ProtoVision XL", category: "3D", image: ProtoVision, id: "urn:air:sdxl:checkpoint:civitai:125703@265938" },
    //     { title: "AniMesh", category: "3D", image: AniMesh, id: "urn:air:sd1:checkpoint:civitai:90642@224732" },
    //     { title: "JuggernautXL X", category: "photorealism", image: JuggernautXL, id: "urn:air:sdxl:checkpoint:civitai:133005@471120" },
    //     { title: "RealVisXL V4.0", category: "photorealism", image: RealVisXL, id: "urn:air:sdxl:checkpoint:civitai:139562@361593" },
    //     { title: "ICBINP XL v6", category: "photorealism", image: ICBINP, id: "urn:air:sdxl:checkpoint:civitai:229002@551129" },
    //     { title: "AbsoluteReality v1.8", category: "photorealism", image: AbsoluteReality, id: "urn:air:sd1:checkpoint:civitai:81458@132760" },
    //     { title: "CyberRealistic v3.1", category: "photorealism", image: CyberRealistic, id: "urn:air:sd1:checkpoint:civitai:15003@537505" },
    //     { title: "majicMIX realistic v6", category: "photorealism", image: majicMIX, id: "urn:air:sd1:checkpoint:civitai:43331@176425" },
    //     { title: "Analog Diffusion", category: "photorealism", image: Analog, id: "urn:air:sd1:checkpoint:civitai:8030@261539" },
    //     { title: "RealCartoonXL v6", category: "style", image: RealCartoonXL, id: "urn:air:sdxl:checkpoint:civitai:125907@686204" },
    //     { title: "Lah Mysterious", category: "style", image: LahMysterious, id: "urn:air:sdxl:checkpoint:civitai:118441@387984" },
    //     { title: "LEOSAM's HelloWorld XL", category: "style", image: LEOSAM, id: "urn:air:sdxl:checkpoint:civitai:43977@570138" },
    //     { title: "Photon", category: "style", image: Photon, id: "urn:air:sd1:checkpoint:civitai:84728@90072" },
    //     { title: "SDVN7-NijiStyleXL", category: "style", image: SDVN7, id: "urn:air:sdxl:checkpoint:civitai:123307@155870" },
    //     { title: "SereneXL", category: "style", image: SereneXL, id: "urn:air:sdxl:checkpoint:civitai:203269@358941" },
    //     { title: "Animagine XL v3.1", category: "anime", image: Animagine, id: "urn:air:sdxl:checkpoint:civitai:260267@403131" },
    //     { title: "CounterfeitXL", category: "anime", image: CounterfeitXL, id: "urn:air:sdxl:checkpoint:civitai:118406@265012" },
    //     { title: "InfiniAnimeXL", category: "anime", image: InfiniAnimeXL, id: "urn:air:sdxl:checkpoint:civitai:132977@146334" },
    //     { title: "Dark Sushi Mix v2.25", category: "anime", image: DarkSushi, id: "urn:air:sd1:checkpoint:civitai:24779@93208" },
    //     { title: "Anime Diffusion", category: "anime", image: AnimeDiffusion, id: "urn:air:sdxl:checkpoint:civitai:124189@372261" },
    // ],
    // '3D': [
    //     { title: "DreamShaper v8", category: "3D", image: DreamShaper, id: "urn:air:sd1:checkpoint:civitai:4384@128713" },
    //     { title: "NeverEnding Dream", category: "3D", image: NeverEnding, id: "urn:air:sd1:checkpoint:civitai:10028@64094" },
    //     { title: "PerfectDeliberate", category: "3D", image: PerfectDeliberate, id: "urn:air:sd1:checkpoint:civitai:24350@253055" },
    //     { title: "DynaVision XL", category: "3D", image: DynaVision, id: "urn:air:sdxl:checkpoint:civitai:122606@297740" },
    //     { title: "AlbedoBase XL", category: "3D", image: AlbedoBase, id: "urn:air:sdxl:checkpoint:civitai:140737@329420" },
    //     { title: "ProtoVision XL", category: "3D", image: ProtoVision, id: "urn:air:sdxl:checkpoint:civitai:125703@265938" },
    //     { title: "AniMesh", category: "3D", image: AniMesh, id: "urn:air:sd1:checkpoint:civitai:90642@224732" },

    // ],

    // 'Photorealism': [
    //     { title: "JuggernautXL X", category: "photorealism", image: JuggernautXL, id: "urn:air:sdxl:checkpoint:civitai:133005@471120" },
    //     { title: "RealVisXL V4.0", category: "photorealism", image: RealVisXL, id: "urn:air:sdxl:checkpoint:civitai:139562@361593" },
    //     { title: "ICBINP XL v6", category: "photorealism", image: ICBINP, id: "urn:air:sdxl:checkpoint:civitai:229002@551129" },
    //     { title: "ProtoVision XL", category: "photorealism", image: ProtoVision, id: "urn:air:sdxl:checkpoint:civitai:125703@265938" },
    //     { title: "DreamShaper v8", category: "photorealism", image: DreamShaper, id: "urn:air:sd1:checkpoint:civitai:4384@128713" },
    //     { title: "AbsoluteReality v1.8", category: "photorealism", image: AbsoluteReality, id: "urn:air:sd1:checkpoint:civitai:81458@132760" },
    //     { title: "CyberRealistic v3.1", category: "photorealism", image: CyberRealistic, id: "urn:air:sd1:checkpoint:civitai:15003@537505" },
    //     { title: "majicMIX realistic v6", category: "photorealism", image: majicMIX, id: "urn:air:sd1:checkpoint:civitai:43331@176425" },
    //     { title: "Analog Diffusion", category: "photorealism", image:Analog, id: "urn:air:sd1:checkpoint:civitai:8030@261539" },
    // ],

    // 'Styles': [
    //     { title: "RealCartoonXL v6", category: "style", image: RealCartoonXL, id: "urn:air:sdxl:checkpoint:civitai:125907@686204" },
    //     { title: "Lah Mysterious", category: "style", image: LahMysterious, id: "urn:air:sdxl:checkpoint:civitai:118441@387984" },
    //     { title: "DynaVision XL", category: "style", image: DynaVision, id: "urn:air:sdxl:checkpoint:civitai:122606@297740" },
    //     { title: "Analog Diffusion", category: "style", image: Analog, id: "urn:air:sd1:checkpoint:civitai:8030@261539" },
    //     { title: "LEOSAM's HelloWorld XL", category: "style", image: LEOSAM, id: "urn:air:sdxl:checkpoint:civitai:43977@570138" },
    //     { title: "Photon", category: "style", image: Photon, id: "urn:air:sd1:checkpoint:civitai:84728@90072" },
    //     { title: "SDVN7-NijiStyleXL", category: "style", image: SDVN7, id: "urn:air:sdxl:checkpoint:civitai:123307@155870" },
    //     { title: "SereneXL", category: "style", image: SereneXL, id: "urn:air:sdxl:checkpoint:civitai:203269@358941" },

    // ],

    // 'Anime': [
    //     { title: "Animagine XL v3.1", category: "anime", image: Animagine, id: "urn:air:sdxl:checkpoint:civitai:260267@403131" },
    //     { title: "CounterfeitXL", category: "anime", image: CounterfeitXL, id: "urn:air:sdxl:checkpoint:civitai:118406@265012" },
    //     { title: "SDVN7-NijiStyleXL", category: "anime", image: SDVN7, id: "urn:air:sdxl:checkpoint:civitai:123307@155870" },
    //     { title: "ProtoVision XL", category: "anime", image: ProtoVision, id: "urn:air:sdxl:checkpoint:civitai:125703@265938" },
    //     { title: "InfiniAnimeXL", category: "anime", image: InfiniAnimeXL, id: "urn:air:sdxl:checkpoint:civitai:132977@146334" },
    //     { title: "Dark Sushi Mix v2.25", category: "anime", image: DarkSushi, id: "urn:air:sd1:checkpoint:civitai:24779@93208" },
    //     { title: "NeverEnding Dream", category: "anime", image: NeverEnding ,id: "urn:air:sd1:checkpoint:civitai:10028@64094" },
    //     { title: "Anime Diffusion", category: "anime", image: AnimeDiffusion, id: "urn:air:sdxl:checkpoint:civitai:124189@372261" }
    // ]

    'all': [
        { title: "DreamShaper v8", category: "3D", image: DreamShaper, id: "4zdwGOB" },
        { title: "NeverEnding Dream", category: "3D", image: NeverEnding, id: "qGdxrYG" },
        { title: "PerfectDeliberate", category: "3D", image: PerfectDeliberate, id: "WLNOl76" },
        { title: "DynaVision XL", category: "3D", image: DynaVision, id: "nG2nkqN" },
        { title: "AlbedoBase XL", category: "3D", image: AlbedoBase, id: "MRmvdVG" },
        { title: "ProtoVision XL", category: "3D", image: ProtoVision, id: "DreamFul" },
        { title: "AniMesh", category: "3D", image: AniMesh, id: "lGJBaxy" },
        { title: "JuggernautXL X", category: "photorealism", image: JuggernautXL, id: "bLvm8Ye" },
        { title: "RealVisXL V4.0", category: "photorealism", image: RealVisXL, id: "8jqEDBN" },
        { title: "ICBINP XL v6", category: "photorealism", image: ICBINP, id: "GbEkeEP" },
        { title: "AbsoluteReality v1.8", category: "photorealism", image: AbsoluteReality, id: "mGYMaD5" },
        { title: "CyberRealistic v3.1", category: "photorealism", image: CyberRealistic, id: "d55J1xB" },
        { title: "majicMIX realistic v6", category: "photorealism", image: majicMIX, id: "yBG2r9O" },
        { title: "Analog Diffusion", category: "photorealism", image: Analog, id: "woojZkD" },
        { title: "RealCartoonXL v6", category: "style", image: RealCartoonXL, id: "gLv9zeq" },
        { title: "Lah Mysterious", category: "style", image: LahMysterious, id: "vln8Nwr" },
        { title: "LEOSAM's HelloWorld XL", category: "style", image: LEOSAM, id: "LA9j2nX" },
        { title: "Photon", category: "style", image: Photon, id: "NRz9J7R2" },
        { title: "SDVN7-NijiStyleXL", category: "style", image: SDVN7, id: "lGJBaxy" },
        { title: "SereneXL", category: "style", image: SereneXL, id: "X9zNVO1" },
        { title: "Animagine XL v3.1", category: "anime", image: Animagine, id: "vl5nZmX" },
        { title: "CounterfeitXL", category: "anime", image: CounterfeitXL, id: "76EmEaz" },
        { title: "InfiniAnimeXL", category: "anime", image: InfiniAnimeXL, id: "k4kW669" },
        { title: "Dark Sushi Mix v2.25", category: "anime", image: DarkSushi, id: "PREaKGN" },
        { title: "Anime Diffusion", category: "anime", image: AnimeDiffusion, id: "DY5rYnx" },
    ],
    '3D': [
        { title: "DreamShaper v8", category: "3D", image: DreamShaper, id: "4zdwGOB" },
        { title: "NeverEnding Dream", category: "3D", image: NeverEnding, id: "qGdxrYG" },
        { title: "PerfectDeliberate", category: "3D", image: PerfectDeliberate, id: "WLNOl76" },
        { title: "DynaVision XL", category: "3D", image: DynaVision, id: "nG2nkqN" },
        { title: "AlbedoBase XL", category: "3D", image: AlbedoBase, id: "MRmvdVG" },
        { title: "ProtoVision XL", category: "3D", image: ProtoVision, id: "DreamFul" },
        { title: "AniMesh", category: "3D", image: AniMesh, id: "lGJBaxy" },

    ],

    'Photorealism': [
        { title: "JuggernautXL X", category: "photorealism", image: JuggernautXL, id: "bLvm8Ye" },
        { title: "RealVisXL V4.0", category: "photorealism", image: RealVisXL, id: "8jqEDBN" },
        { title: "ICBINP XL v6", category: "photorealism", image: ICBINP, id: "GbEkeEP" },
        { title: "ProtoVision XL", category: "photorealism", image: ProtoVision, id: "DreamFul" },
        { title: "DreamShaper v8", category: "photorealism", image: DreamShaper, id: "4zdwGOB" },
        { title: "AbsoluteReality v1.8", category: "photorealism", image: AbsoluteReality, id: "mGYMaD5" },
        { title: "CyberRealistic v3.1", category: "photorealism", image: CyberRealistic, id: "d55J1xB" },
        { title: "majicMIX realistic v6", category: "photorealism", image: majicMIX, id: "yBG2r9O" },
        { title: "Analog Diffusion", category: "photorealism", image:Analog, id: "woojZkD" },
    ],

    'Styles': [
        { title: "RealCartoonXL v6", category: "style", image: RealCartoonXL, id: "gLv9zeq" },
        { title: "Lah Mysterious", category: "style", image: LahMysterious, id: "vln8Nwr" },
        { title: "DynaVision XL", category: "style", image: DynaVision, id: "nG2nkqN" },
        { title: "Analog Diffusion", category: "style", image: Analog, id: "woojZkD" },
        { title: "LEOSAM's HelloWorld XL", category: "style", image: LEOSAM, id: "LA9j2nX" },
        { title: "Photon", category: "style", image: Photon, id: "NRz9J7R2" },
        { title: "SDVN7-NijiStyleXL", category: "style", image: SDVN7, id: "lGJBaxy" },
        { title: "SereneXL", category: "style", image: SereneXL, id: "X9zNVO1" },

    ],

    'Anime': [
        { title: "Animagine XL v3.1", category: "anime", image: Animagine, id: "vl5nZmX" },
        { title: "CounterfeitXL", category: "anime", image: CounterfeitXL, id: "76EmEaz" },
        { title: "SDVN7-NijiStyleXL", category: "anime", image: SDVN7, id: "lGJBaxy" },
        { title: "ProtoVision XL", category: "anime", image: ProtoVision, id: "DreamFul" },
        { title: "InfiniAnimeXL", category: "anime", image: InfiniAnimeXL, id: "k4kW669" },
        { title: "Dark Sushi Mix v2.25", category: "anime", image: DarkSushi, id: "PREaKGN" },
        { title: "NeverEnding Dream", category: "anime", image: NeverEnding ,id: "qGdxrYG" },
        { title: "Anime Diffusion", category: "anime", image: AnimeDiffusion, id: "DY5rYnx" }
    ]
};


export default ModelData