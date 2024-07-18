import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateCafeData, createCafeSchema } from "@server/lib/cafe";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { entries } from "@/utils/object";

type CreateCafeDataKey = keyof CreateCafeData;

interface CafeFormItemInfo {
  name: string;
  placeholder: string;
  description?: string;
  type?: string;
  min?: number;
  max?: number;
}

const cafeFormItems: Record<CreateCafeDataKey, CafeFormItemInfo> = {
  name: {
    name: "Name",
    placeholder: "my café",
  },
  googleUrl: {
    name: "Google URL",
    placeholder: "https://maps.app.goo.gl/myCafeUrl",
    description: "Google URL of the café.",
  },
  location: {
    name: "Location",
    placeholder: "Wilmersdorfer Str. 67, 10629 Berlin",
    description: "Full address of the café.",
  },
  imageUrl: {
    name: "Image URL",
    placeholder: "https://www.exampl.com/cafe.jpg",
    description: "Image URL of the café.",
  },
  rating: {
    name: "Rating",
    placeholder: "4.3",
    type: "number",
    min: 0,
    max: 5,
  },
};

const CafeForm = () => {
  const form = useForm<CreateCafeData>({
    resolver: zodResolver(createCafeSchema),
    defaultValues: {
      name: "",
      googleUrl: "",
      location: "",
      imageUrl: "",
      rating: undefined,
    },
  });

  const onSubmit = (data: CreateCafeData) => {
    console.log(data);
  };

  return (
    <div className="max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {entries(cafeFormItems).map(([key, item]) => (
            <FormField
              control={form.control}
              name={key}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.name}</FormLabel>
                  {item.description && (
                    <FormDescription>{item.description}</FormDescription>
                  )}
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={item.placeholder}
                      type={item.type}
                      min={item.min}
                      max={item.max}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">create</Button>
        </form>
      </Form>
    </div>
  );
};

CafeForm.displayName = "CafeForm";

export default CafeForm;
