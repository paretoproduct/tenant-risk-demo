import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import type { ExperianData } from "@/lib/experianParser";

interface RiskHeaderProps {
  data: ExperianData;
}

export const RiskHeader = ({ data }: RiskHeaderProps) => {
  const isRisky = data.hasDefaults;
  const probability = parseFloat(data.defaultProbability);

  return (
    <Card className={`p-6 border-2 ${isRisky ? 'bg-risk-danger-bg border-risk-danger-border' : 'bg-risk-safe-bg border-risk-safe-border'}`}>
      <div className="space-y-6">
        {/* Main Probability Score */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {isRisky ? (
                <AlertCircle className="h-6 w-6 text-risk-danger" />
              ) : (
                <CheckCircle2 className="h-6 w-6 text-risk-safe" />
              )}
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Default Probability
              </h2>
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`text-6xl font-bold tabular-nums ${isRisky ? 'text-risk-danger' : 'text-risk-safe'}`}>
                {probability.toFixed(2)}%
              </span>
              {data.isJudicial && (
                <Badge variant="destructive" className="mb-2">
                  Judicial
                </Badge>
              )}
            </div>
          </div>
          
          {/* Risk Level Indicator */}
          <div className={`px-4 py-2 rounded-lg ${
            data.riskLevel === 'high' ? 'bg-risk-danger text-white' :
            data.riskLevel === 'medium' ? 'bg-risk-warning text-white' :
            'bg-risk-safe text-white'
          }`}>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase">
                {data.riskLevel} Risk
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Payment Status</p>
            <p className={`text-sm font-semibold ${isRisky ? 'text-risk-danger' : 'text-risk-safe'}`}>
              {data.historyStatus}
            </p>
          </div>
          
          {data.hasDefaults && (
            <>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Debt</p>
                <p className="text-sm font-semibold text-foreground">
                  €{parseFloat(data.currentDebt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground mb-1">Unpaid Installments</p>
                <p className="text-sm font-semibold text-foreground">
                  {data.unpaidInstallments}
                </p>
              </div>
              
              {data.lastDefaultDate && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Default</p>
                  <p className="text-sm font-semibold text-foreground">
                    {data.lastDefaultDate}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
