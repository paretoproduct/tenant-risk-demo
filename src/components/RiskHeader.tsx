import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, TrendingUp, FileText } from "lucide-react";
import type { ExperianData } from "@/lib/experianParser";

interface RiskHeaderProps {
  data: ExperianData;
}

export const RiskHeader = ({ data }: RiskHeaderProps) => {
  const isRisky = data.hasDefaults;
  const isHighRisk = data.riskLevel === "high";
  const isLowRisk = data.riskLevel === "low";

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <Card className={`p-6 border-2 ${isRisky ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              {isRisky ? (
                <AlertCircle className="h-5 w-5 text-red-600" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              )}
              <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide">Default Status</h2>
            </div>
            <h3 className={`text-2xl font-bold ${isRisky ? "text-red-600" : "text-green-600"}`}>
              {isRisky ? "Defaults detected" : "No defaults detected"}
            </h3>

            {/* Key Metrics for Bad Profile */}
            {isRisky && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                  <p className="text-base font-semibold text-red-600">{data.historyStatus}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Debt</p>
                  <p className="text-base font-semibold text-gray-900">
                    €
                    {parseFloat(data.currentDebt).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Unpaid Installments</p>
                  <p className="text-base font-semibold text-gray-900">{data.unpaidInstallments}</p>
                </div>

                {data.lastDefaultDate && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Last Default</p>
                    <p className="text-base font-semibold text-gray-900">{data.lastDefaultDate}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Risk Level Badge */}
          <div
            className={`px-4 py-2 rounded-lg flex-shrink-0 ${
              isHighRisk ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold uppercase whitespace-nowrap">{data.riskLevel} Risk</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Additional Info Card - Only for Good Profile */}
      {!isRisky && (
        <Card className="p-6 bg-muted/30">
          <div className="flex items-center gap-3 text-muted-foreground">
            <FileText className="h-5 w-5" />
            <p className="text-sm">This user has no default history.</p>
          </div>
        </Card>
      )}
    </div>
  );
};
