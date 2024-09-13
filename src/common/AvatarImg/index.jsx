import "./index.css";
const AvatarImg=({imgUrl})=>{
    return <img src={imgUrl} alt="user-image" height={50} width={50} className="user-image-wrapper" />
}
export default AvatarImg;