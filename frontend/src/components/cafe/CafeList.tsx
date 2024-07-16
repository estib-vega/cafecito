import React from "react";
import Alert from "@/components/generic/Alert";
import { useCafeList } from "@/components/hooks/cafeApi";
import CafeCard, { CafeCardProps } from "./CafeCard";
import SkeletonCafeCard from "./SkeletonCafeCard";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CafeListContainerProps {
  children?: React.ReactNode;
}

const CafeListContainer = (props: CafeListContainerProps) => {
  return (
    <div className="h-full w-full mx-auto">
      <ScrollArea type="scroll" className="h-full w-full">
        <div className="flex flex-col items-center p-8 space-y-8">
          {props.children}
        </div>
      </ScrollArea>
    </div>
  );
};

const CafeList = () => {
  const { isPending, error, data } = useCafeList();

  if (isPending) {
    return (
      <CafeListContainer>
        <SkeletonCafeCard />
        <SkeletonCafeCard />
      </CafeListContainer>
    );
  }

  if (error) {
    return (
      <CafeListContainer>
        <Alert type="error" title="Error" description={error.message} />
      </CafeListContainer>
    );
  }

  const cafes: CafeCardProps[] = data;

  return (
    <CafeListContainer>
      {cafes.map((cafe, index) => (
        <CafeCard key={index} {...cafe} />
      ))}
      <div className="h-56"></div>
    </CafeListContainer>
  );
};

CafeList.displayName = "CafeList";

export default CafeList;
