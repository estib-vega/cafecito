import { CircleX, Info, CircleAlert } from "lucide-react";
import {
  Alert as UIAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

type AlertType = "info" | "warning" | "error";

function getCSSColor(type: AlertType): string {
  switch (type) {
    case "info":
      return "var(--info)";
    case "warning":
      return "var(--warning)";
    case "error":
      return "var(--error)";
  }
}

const AlertIcon = (props: { type: AlertType }): JSX.Element => {
  switch (props.type) {
    case "info":
      return <Info color={getCSSColor(props.type)} />;
    case "warning":
      return <CircleAlert color={getCSSColor(props.type)} />;
    case "error":
      return <CircleX color={getCSSColor(props.type)} />;
  }
};

interface AlertProps {
  type: AlertType;
  title: string;
  description: string;
}

const Alert = (props: AlertProps): JSX.Element => {
  return (
    <UIAlert>
      <AlertIcon type={props.type} />
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </UIAlert>
  );
};

Alert.displayName = "Alert";

export default Alert;
