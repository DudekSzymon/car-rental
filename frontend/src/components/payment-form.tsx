import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function PaymentForm() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Payment Method</CardTitle>
        <CardDescription>
          All transactions are secure and encrypted
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name on Card</Label>
          <Input id="name" placeholder="John Doe" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="number">Card Number</Label>
            <Input id="number" placeholder="1234 5678 9012 3456" />
            <p className="text-[0.8rem] text-muted-foreground">
              Enter your 16-digit number.
            </p>
          </div>
          <div className="col-span-1 space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="123" maxLength={3} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Month</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <SelectItem
                    key={month}
                    value={month.toString().padStart(2, "0")}
                  >
                    {month.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Year</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() + i
                ).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-border" />

        {/* Billing Address */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-medium leading-none">Billing Address</h3>
            <p className="text-sm text-muted-foreground">
              The billing address associated with your payment method
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="billing" defaultChecked />
            <Label
              htmlFor="billing"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Same as shipping address
            </Label>
          </div>
        </div>

        <div className="h-px bg-border" />

        <div className="space-y-2">
          <Label htmlFor="comments">Comments</Label>
          <Textarea
            id="comments"
            placeholder="Add any additional comments"
            className="resize-none min-h-20"
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-row items-center gap-3 w-full pt-2">
        <Button className="flex-1" type="submit">
          Submit
        </Button>
        <Button variant="outline" className="flex-1" type="button">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}
