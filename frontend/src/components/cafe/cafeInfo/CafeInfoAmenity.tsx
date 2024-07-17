import CafeInfoIcon, { IconName } from "./CafeInfoIcon";

interface CafeInfoAmenityProps {
  iconName: IconName;
  children: React.ReactNode;
}

const CafeInfoAmenity = (props: CafeInfoAmenityProps) => {
  return (
    <div className="flex items-center gap-2 border p-2 rounded-md">
      <CafeInfoIcon name={props.iconName} />
      {props.children}
    </div>
  );
};

CafeInfoAmenity.displayName = "CafeInfoAmenity";

export default CafeInfoAmenity;
