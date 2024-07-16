import { ExternalLink } from "lucide-react";

interface LinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

const Link = (props: LinkProps): JSX.Element => {
  return (
    <>
      <a
        href={props.href}
        target={props.external ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className="underline"
      >
        {props.children}
      </a>
      {props.external && (
        <ExternalLink className="inline ml-[2px] mb-[3px]" size={"1em"} />
      )}
    </>
  );
};

Link.displayName = "Link";

export default Link;
