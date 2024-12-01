interface LogoProps {
  classname?: string;
}

function Logo({ classname }: LogoProps) {
  return <div className={classname}>GG</div>;
}

export default Logo;
