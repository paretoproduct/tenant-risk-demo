import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";
import type { ExperianData } from "@/lib/experianParser";

interface RiskReasonProps {
  data: ExperianData;
}

export const RiskReason = ({ data }: RiskReasonProps) => {
  const isRisky = data.hasDefaults;
  const probability = parseFloat(data.defaultProbability);

  const getRiskContext = () => {
    if (probability < 5) return "This indicates a very low likelihood of payment issues.";
    if (probability < 20) return "This indicates a moderate risk that requires careful consideration.";
    return "This indicates a significant risk of payment default.";
  };

  const reasons = [];
  
  if (data.hasDefaults) {
    if (data.unpaidInstallments && parseInt(data.unpaidInstallments) > 0) {
      reasons.push(`Has ${data.unpaidInstallments} unpaid installments`);
    }
    
    if (data.currentDebt && parseFloat(data.currentDebt) > 0) {
      reasons.push(`Outstanding debt of €${parseFloat(data.currentDebt).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    }
    
    if (data.isJudicial) {
      reasons.push("The operation is in judicial status");
    }
    
    if (data.lastDefaultDate) {
      reasons.push(`Most recent default: ${data.lastDefaultDate}`);
    }
    
    if (data.firstDefaultDate) {
      reasons.push(`First default occurred on ${data.firstDefaultDate}`);
    }
    
    if (data.firstDefaultDate && data.lastUpdateDate) {
      const [d1, m1, y1] = data.firstDefaultDate.split('/').map(Number);
      const [d2, m2, y2] = data.lastUpdateDate.split('/').map(Number);
      const firstDate = new Date(y1, m1 - 1, d1);
      const lastDate = new Date(y2, m2 - 1, d2);
      const months = Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
      if (months > 0) {
        reasons.push(`Debt has been unpaid for ~${months} months`);
      }
    }
    
    if (data.product && data.creditor) {
      const productLower = data.product.toLowerCase();
      const creditorLower = data.creditor.toLowerCase();
      reasons.push(`The debt comes from a ${productLower} issued by a ${creditorLower}`);
    }
    
    if (data.isJudicial && data.paymentHistory && data.paymentHistory.length > 1) {
      reasons.push("The payment status escalated from late payments to a judicial process");
    }
  } else {
    reasons.push("No registered default operations in credit history");
    reasons.push("Clean payment track record");
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {isRisky ? (
            <AlertTriangle className="h-5 w-5 text-risk-danger" />
          ) : (
            <CheckCircle className="h-5 w-5 text-risk-safe" />
          )}
          <h3 className="text-lg font-semibold">
            {isRisky ? "Why This Profile is Risky" : "Why This Profile is Safe"}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {getRiskContext()}
        </p>
        
        <ul className="space-y-2 mt-4">
          {reasons.map((reason, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                isRisky ? 'bg-risk-danger' : 'bg-risk-safe'
              }`} />
              <span className="text-sm">{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
