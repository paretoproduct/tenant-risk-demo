import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Building2,
  CreditCard,
  Calendar,
  MapPin,
  TrendingUp,
} from "lucide-react";
import type { ExperianData } from "@/lib/experianParser";

interface DebtDetailsAccordionProps {
  data: ExperianData;
}

export const DebtDetailsAccordion = ({ data }: DebtDetailsAccordionProps) => {
  if (!data.hasDefaults) {
    return (
      <Card className="p-6 bg-muted/30">
        <div className="flex items-center gap-3 text-muted-foreground">
          <FileText className="h-5 w-5" />
          <p className="text-sm">This user has no default history.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="debt-details" className="border-none">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              <span className="text-lg font-semibold">Detailed Debt Information</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-4">
              {/* Operation Details Section */}
              {(data.creditor || data.product || data.operationId) && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Operation Details
                  </h4>
                  <div className="space-y-3 pl-6 border-l-2 border-border">
                    {data.creditor && (
                      <div className="flex items-start gap-3">
                        <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Creditor</p>
                          <p className="text-sm font-medium">{data.creditor}</p>
                        </div>
                      </div>
                    )}
                    
                    {data.product && (
                      <div className="flex items-start gap-3">
                        <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Product</p>
                          <p className="text-sm font-medium">{data.product}</p>
                        </div>
                      </div>
                    )}
                    
                    {data.operationId && (
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Operation ID</p>
                          <p className="text-sm font-mono">{data.operationId}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Payment History Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Payment History
                </h4>
                <div className="space-y-4 pl-6 border-l-2 border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.firstDefaultDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">First Default</p>
                        <p className="text-sm font-medium">{data.firstDefaultDate}</p>
                      </div>
                    )}
                    {data.lastDefaultDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Last Default</p>
                        <p className="text-sm font-medium">{data.lastDefaultDate}</p>
                      </div>
                    )}
                    {data.unpaidInstallments && (
                      <div>
                        <p className="text-xs text-muted-foreground">Unpaid Installments</p>
                        <p className="text-sm font-medium">{data.unpaidInstallments}</p>
                      </div>
                    )}
                    {data.currentDebt && parseFloat(data.currentDebt) > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">Balance Outstanding</p>
                        <p className="text-sm font-medium">
                          €{parseFloat(data.currentDebt).toLocaleString('en-US', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </p>
                      </div>
                    )}
                    {data.maxDebtAmount && parseFloat(data.maxDebtAmount) > 0 && (
                      <div>
                        <p className="text-xs text-muted-foreground">Maximum Outstanding Amount</p>
                        <p className="text-sm font-medium">
                          €{parseFloat(data.maxDebtAmount).toLocaleString('en-US', { 
                            minimumFractionDigits: 2, 
                            maximumFractionDigits: 2 
                          })}
                        </p>
                      </div>
                    )}
                    {data.currentDebt !== undefined && (
                      <div>
                        <p className="text-xs text-muted-foreground">Debt Status</p>
                        <Badge variant={parseFloat(data.currentDebt) > 0 ? "destructive" : "outline"} className="mt-1">
                          {parseFloat(data.currentDebt) > 0 ? "Active" : "Closed"}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Status Evolution */}
              {data.paymentHistory && data.paymentHistory.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Payment Status Evolution
                  </h4>
                  <div className="space-y-2 pl-6 border-l-2 border-border">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="font-mono text-xs min-w-[2rem] justify-center">
                        2
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Late payment: 60–90 days
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="font-mono text-xs min-w-[2rem] justify-center">
                        3
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Late payment: 90–120 days
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="font-mono text-xs min-w-[2rem] justify-center">
                        4
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Late payment: 120–150 days
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="font-mono text-xs min-w-[2rem] justify-center">
                        J
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Judicial status
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Registration Details */}
              {(data.registrationDate || data.lastUpdateDate) && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Registration Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-border">
                    {data.registrationDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Registration Date</p>
                        <p className="text-sm font-medium">{data.registrationDate}</p>
                      </div>
                    )}
                    {data.lastUpdateDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Last Update</p>
                        <p className="text-sm font-medium">{data.lastUpdateDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Location */}
              {data.postalCode && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h4>
                  <div className="pl-6 border-l-2 border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Postal Code (Sociodemographic data)</p>
                      <p className="text-sm font-medium">{data.postalCode}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
