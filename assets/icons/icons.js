import { API_ENDPOINT } from "@froyo/constants";
import FroyoIcon from "./Froyo.svg";
import ChatIcon from "./Chat.svg";
import ChatUnreadIconMint from "./ChatUnread-mint.svg";
import ChatUnreadIconCoffee from "./ChatUnread-coffee.svg";
import ChatUnreadIconStrawberry from "./ChatUnread-strawberry.svg";
import ChatUnreadIconBlueberry from "./ChatUnread-blueberry.svg";
import ChatUnreadIconMango from "./ChatUnread-mango.svg";
import PlusIcon from "./Plus.svg";
import GearIcon from "./Gear.svg";
import UploadIcon from "./Upload.svg";
import NoWifiIcon from "./NoWifi.svg";
import MeetupIcon from "./Meetup.svg";
import HomeIcon from "./Home.svg";
import SearchIcon from "./Search.svg";
import CloseIcon from "./Close.svg";
import CreateIcon from "./Create.svg";
import LocationIcon from "./Location.svg";
import MoreOptionsIcon from "./MoreOptions.svg";
import LikeIconFill from "./Like-Fill.svg";
import DislikeIconFill from "./Dislike-Fill.svg";
import LikeIconOutline from "./Like-Outline.svg";
import DislikeIconOutline from "./Dislike-Outline.svg";
import CommentIcon from "./Comment.svg";
import ReplyIcon from "./Reply.svg";
import BackIcon from "./Back.svg";
import SendIcon from "./Send.svg";
import PlusCircleIcon from "./Plus-Circle.svg";
import CloseCircleIcon from "./CloseCircle.svg";
import LoadingIcon from "./animation/Loading.svg";

module.exports = {
    FroyoIcon,
    PlusIcon,
    GearIcon,
    UploadIcon,
    NoWifiIcon,
    MeetupIcon,
    HomeIcon,
    SearchIcon,
    CloseIcon,
    CreateIcon,
    LocationIcon,
    MoreOptionsIcon,
    LikeIconFill,
    DislikeIconFill,
    LikeIconOutline,
    DislikeIconOutline,
    CommentIcon,
    ReplyIcon,
    BackIcon,
    SendIcon,
    PlusCircleIcon,
    CloseCircleIcon,
    LoadingIcon,
    chatIcon: (unread, flavor) => {
        if(!unread) return ChatIcon;
        switch(flavor) {
            case "mint":
                return ChatUnreadIconMint;
            case "coffee":
                return ChatUnreadIconCoffee;
            case "strawberry":
                return ChatUnreadIconStrawberry;
            case "blueberry":
                return ChatUnreadIconBlueberry;
            case "mango":
                return ChatUnreadIconMango;
            default:
                return ChatUnreadIconMint;
        }
    },
    guestProfilePicture: (flavor) => {
        switch(flavor){
            case "mint":
                return require("./defaults/guest/guest-mint.png");
            case "coffee":
                return require("./defaults/guest/guest-coffee.png");
            case "strawberry":
                return require("./defaults/guest/guest-strawberry.png");
            case "blueberry":
                return require("./defaults/guest/guest-blueberry.png");
            case "mango":
                return require("./defaults/guest/guest-mango.png");
            default:
                return require("./defaults/guest/guest-mint.png");
        }
    },
    groupProfilePicture: (flavor) => {
        switch(flavor){
            case "mint":
                return require("./defaults/group/group-mint.png");
            case "coffee":
                return require("./defaults/group/group-coffee.png");
            case "strawberry":
                return require("./defaults/group/group-strawberry.png");
            case "blueberry":
                return require("./defaults/group/group-blueberry.png");
            case "mango":
                return require("./defaults/group/group-mango.png");
            default:
                return require("./defaults/group/group-mint.png");
        }
    },
    awsBucketImage: (key) => {
        return {
            uri: `${API_ENDPOINT}/images/${key}`
        };
    }
};