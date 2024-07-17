import CafeInfoIcon, { IconName } from "./CafeInfoIcon";

interface CafeInfoAmenityProps {
  iconName: IconName;
  children: React.ReactNode;
}

const CafeInfoAmenity = (props: CafeInfoAmenityProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 border px-2 py-4 rounded-md w-full">
      <CafeInfoIcon name={props.iconName} />
      {props.children}
    </div>
  );
};

CafeInfoAmenity.displayName = "CafeInfoAmenity";

export default CafeInfoAmenity;
