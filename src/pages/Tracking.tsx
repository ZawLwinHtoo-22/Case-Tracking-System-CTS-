import { useState } from "react";
import { Car, Flame, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import MotorTracking from "@/components/tracking/MotorTracking";

export default function Tracking() {
  const [activeTab, setActiveTab] = useState("motor");

  return (
    <div className="space-y-6 animate-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="motor" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Motor
          </TabsTrigger>
          <TabsTrigger value="fire" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Fire
          </TabsTrigger>
          <TabsTrigger value="cargo" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Cargo
          </TabsTrigger>
        </TabsList>
        <TabsContent value="motor" className="mt-6">
          <MotorTracking />
        </TabsContent>

        <TabsContent value="fire" className="mt-6">
          <Card>
            <CardContent className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <Flame className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  Fire Insurance Tracking
                </p>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cargo" className="mt-6">
          <Card>
            <CardContent className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-4 text-lg font-medium text-muted-foreground">
                  Cargo Insurance Tracking
                </p>
                <p className="text-sm text-muted-foreground">Coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
