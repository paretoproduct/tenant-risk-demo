import { useState, useEffect } from "react";
import { RiskHeader } from "@/components/RiskHeader";
import { RiskReason } from "@/components/RiskReason";
import { DebtDetailsAccordion } from "@/components/DebtDetailsAccordion";
import { parseExperianJSON, type ExperianData } from "@/lib/experianParser";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [profileType, setProfileType] = useState<"good" | "bad">("good");
  const [data, setData] = useState<ExperianData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const fileName = profileType === "good" ? "good-profile.json" : "bad-profile.json";
        const response = await fetch(`/data/${fileName}`);
        
        if (!response.ok) {
          throw new Error("Failed to load profile data");
        }
        
        const json = await response.json();
        const parsed = parseExperianJSON(json);
        setData(parsed);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [profileType]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Data</h1>
          <p className="text-muted-foreground">{error || "Data not available"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Prototype Toggle - Not part of final design */}
        <div className="flex items-center justify-center gap-3 pb-4 border-b border-border">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            Prototype Toggle:
          </span>
          <div className="flex gap-2">
            <Button
              variant={profileType === "good" ? "default" : "outline"}
              size="sm"
              onClick={() => setProfileType("good")}
            >
              Good Profile
            </Button>
            <Button
              variant={profileType === "bad" ? "default" : "outline"}
              size="sm"
              onClick={() => setProfileType("bad")}
            >
              Bad Profile
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Credit Risk Assessment</h1>
            <p className="text-muted-foreground">
              Experian report analysis for tenant screening
            </p>
          </div>

          <RiskHeader data={data} />
          <RiskReason data={data} />
          <DebtDetailsAccordion data={data} />
        </div>
      </div>
    </div>
  );
};

export default Index;
