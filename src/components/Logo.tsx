import logo from "../assets/logo.png";

interface LogoProps {
  classname?: string;
  size?: "small" | "medium" | "large";
  textOnly?: boolean;
  withText?: boolean;
}

function Logo({
  classname = "",
  size = "medium",
  textOnly = false,
  withText = false,
}: LogoProps) {
  let sizeClasses = "";
  let textSizeClasses = "";

  switch (size) {
    case "small":
      sizeClasses = "w-12 h-12";
      break;
    case "medium":
      sizeClasses = "w-24 h-24";
      break;
    case "large":
      sizeClasses = "w-36 h-36";
      break;
    default:
      sizeClasses = "w-24 h-24";
  }

  switch (size) {
    case "small":
      textSizeClasses = "text-xl";
      break;
    case "medium":
      textSizeClasses = "text-2xl";
      break;
    case "large":
      textSizeClasses = "text-4xl";
      break;
    default:
      textSizeClasses = "text-2xl";
  }

  if (textOnly) {
    return (
      <div className={`${textSizeClasses} ${classname}`}>
        <span className="font-bold">GENTEL GEN</span>
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} ${classname} flex items-center`}>
      <img src={logo} alt="logo" className="h-full w-full object-contain" />
      {withText && (
        <span className={`ml-2 ${textSizeClasses} font-semibold`}>
          GENTEL GEN
        </span>
      )}{" "}
      {/* Optional text */}
    </div>
  );
}

export default Logo;
