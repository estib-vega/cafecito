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
import { cafeFormItems } from "./cafeFormHelpers";

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
