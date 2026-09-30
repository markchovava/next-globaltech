"use client"

import {
    AiOutlineDashboard,
    AiOutlineDatabase
} from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { FaSearch, } from "react-icons/fa"
import {
    FaAngleDown,
    FaAngleLeft,
    FaAngleRight,
    FaAngleUp,
    FaFacebook,
    FaImages,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaRegEye,
    FaRegHandshake,
    FaRegStar,
    FaRegUser,
    FaTiktok,
    FaUpload,
    FaWhatsapp,
    FaXTwitter,
    FaLocationDot
} from "react-icons/fa6";
import {
    GiHamburgerMenu,
    GiMountaintop
} from "react-icons/gi";
import { GoDotFill } from "react-icons/go";
import {
    GrContact
} from "react-icons/gr";
import {
    IoIosPricetags,
    IoMdHelp,
    IoMdRemoveCircleOutline
} from "react-icons/io";
import {
    IoAddCircleOutline,
    IoClose,
    IoDocumentsOutline,
    IoHomeOutline,
    IoLocationOutline,
    IoPersonCircleOutline,
    IoSettingsOutline
} from "react-icons/io5";
import {
    LuEyeClosed,
    LuPackage
} from "react-icons/lu";
import {
    MdBorderAll,
    MdCabin,
    MdInfoOutline,
    MdOutlineAirlines,
    MdOutlineCategory,
    MdOutlineDescription,
    MdOutlineDesignServices,
    MdOutlineFlight,
    MdOutlineGroups,
    MdOutlineMailOutline,
    MdOutlineMessage,
    MdOutlinePersonAddAlt,
    MdOutlineProductionQuantityLimits,
    MdOutlineVideoLibrary
} from "react-icons/md";
import {
    PiAirplaneTiltLight,
    PiCity,
    PiSolarRoofDuotone
} from "react-icons/pi";
import {
    RiCalendarEventLine,
    RiDeleteBin2Fill,
    RiRouteLine,
    RiTimeLine
} from "react-icons/ri";
import {
    SiMaterialdesignicons
} from "react-icons/si";
import {
    TbSolarElectricity,
    TbSolarPanel2
} from "react-icons/tb";
import {
    TiMediaPlay
} from "react-icons/ti";
import {
    VscProject
} from "react-icons/vsc";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { TbGasStation } from "react-icons/tb";
import { TbManualGearbox } from "react-icons/tb";
import { PiEngineBold } from "react-icons/pi";
import { FaCaretRight } from "react-icons/fa";
import { LuPaintbrushVertical } from "react-icons/lu";
import { FaRegNewspaper } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiTargetLine } from "react-icons/ri";
import { IoDiamondOutline } from "react-icons/io5";
import { MdWorkHistory } from "react-icons/md";
import { PiMapPinAreaBold } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";
import { MdLockPerson } from "react-icons/md";
import { GoTrophy } from "react-icons/go";



interface PropsInterface {
    type: string
    css?: string
}

export default function IconDefault({
    type,
    css = ""
}: PropsInterface) {

    switch (type) {
        case 'briefcase':
            return <LuBriefcaseBusiness className={css} />
        case 'quality':
            return <GoTrophy className={css} />
        case 'excellence':
            return <MdLockPerson className={css} />
        case 'group':
            return <GrGroup className={css} />
        case 'experience':
            return <MdWorkHistory className={css} />
        case 'region':
            return <PiMapPinAreaBold className={css} />
        case 'mission':
            return <RiTargetLine className={css} />
        case 'values':
        case 'diamond':
            return <IoDiamondOutline className={css} />
        case 'right-long':
            return <FaArrowRightLong className={css} />
        case 'add':
            return <IoAddCircleOutline className={css} />
        case 'news':
            return <FaRegNewspaper className={css} />
        case 'brush':
            return <LuPaintbrushVertical className={css} />
        case 'gas-station':
            return <TbGasStation className={css} />
        case 'gearbox':
            return <TbManualGearbox className={css} />
        case 'engine':
            return <PiEngineBold className={css} />
        case 'address':
        case 'city':
        case 'location':
        case 'map':
            return <IoLocationOutline className={css} />
        case 'airline':
            return <MdOutlineAirlines className={css} />
        case 'airplane':
            return <PiAirplaneTiltLight className={css} />
        case 'cabin':
            return <MdCabin className={css} />
        case 'calendar':
            return <RiCalendarEventLine className={css} />
        case 'car':
            return <BsCarFrontFill className={css} />
        case 'category':
            return <MdOutlineCategory className={css} />
        case 'client':
            return <MdOutlinePersonAddAlt className={css} />
        case 'close':
            return <IoClose className={css} />
        case 'contact':
            return <GrContact className={css} />
        case 'dashboard':
            return <AiOutlineDashboard className={css} />
        case 'delete':
            return <RiDeleteBin2Fill className={css} />
        case 'document':
            return <IoDocumentsOutline className={css} />
        case 'dot':
            return <GoDotFill className={css} />
        case 'down':
            return <FaAngleDown className={css} />
        case 'email':
            return <MdOutlineMailOutline className={css} />
        case 'eye':
        case 'vision':
            return <FaRegEye className={css} />
        case 'eye-closed':
            return <LuEyeClosed className={css} />
        case 'facebook':
            return <FaFacebook className={css} />
        case 'flight':
            return <MdOutlineFlight className={css} />
        case 'help':
            return <IoMdHelp className={css} />
        case 'home':
            return <IoHomeOutline className={css} />
        case 'house':
            return <BiBuildingHouse className={css} />
        case 'image':
            return <FaImages className={css} />
        case 'info':
            return <MdInfoOutline className={css} />
        case 'instagram':
            return <FaInstagram className={css} />
        case 'left':
            return <FaAngleLeft className={css} />
        case 'linkedin':
            return <FaLinkedin className={css} />
        case 'media':
            return <TiMediaPlay className={css} />
        case 'menu':
            return <GiHamburgerMenu className={css} />
        case 'message':
            return <MdOutlineMessage className={css} />
        case 'meta':
            return <AiOutlineDatabase className={css} />
        case 'mount':
            return <GiMountaintop className={css} />
        case 'order':
            return <MdBorderAll className={css} />
        case 'package':
            return <LuPackage className={css} />
        case 'page':
            return <MdOutlineDescription className={css} />
        case 'approach':
        case 'partner':
            return <FaRegHandshake className={css} />
        case 'person':
            return <IoPersonCircleOutline className={css} />
        case 'phone':
            return <FaPhone className={css} />
        case 'product':
            return <MdOutlineProductionQuantityLimits className={css} />
        case 'project':
            return <VscProject className={css} />
        case 'property':
            return <PiCity className={css} />
        case 'remove':
            return <IoMdRemoveCircleOutline className={css} />
        case 'right':
            return <FaAngleRight className={css} />
        case 'right-filled':
            return <FaCaretRight className={css} />
        case 'role':
            return <MdOutlineGroups className={css} />
        case 'route':
            return <RiRouteLine className={css} />
        case 'search':
            return <FaSearch className={css} />
        case 'service':
            return <MdOutlineDesignServices className={css} />
        case 'settings':
            return <IoSettingsOutline className={css} />
        case 'solar':
            return <TbSolarPanel2 className={css} />
        case 'solar-power':
            return <TbSolarElectricity className={css} />
        case 'solar-roof':
            return <PiSolarRoofDuotone className={css} />
        case 'star':
            return <FaRegStar className={css} />
        case 'tag':
            return <IoIosPricetags className={css} />
        case 'tiktok':
            return <FaTiktok className={css} />
        case 'time':
            return <RiTimeLine className={css} />
        case 'twitter':
            return <FaXTwitter className={css} />
        case 'up':
            return <FaAngleUp className={css} />
        case 'upload':
            return <FaUpload className={css} />
        case 'user':
            return <FaRegUser className={css} />
        case 'video':
            return <MdOutlineVideoLibrary className={css} />
        case 'whatsapp':
            return <FaWhatsapp className={css} />
        default:
            return <SiMaterialdesignicons className={css} />
    }
}