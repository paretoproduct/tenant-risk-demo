import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Building2, CreditCard, Calendar, MapPin } from "lucide-react";
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
              {/* Creditor Info */}
              {data.creditor && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Creditor</p>
                    <p className="text-sm font-medium">{data.creditor}</p>
                  </div>
                </div>
              )}

              {/* Product Type */}
              {data.product && (
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Product Type</p>
                    <p className="text-sm font-medium">{data.product}</p>
                  </div>
                </div>
              )}

              {/* Key Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                {data.firstDefaultDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">First Default</p>
                      <p className="text-sm font-medium">{data.firstDefaultDate}</p>
                    </div>
                  </div>
                )}
                
                {data.lastDefaultDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Last Default</p>
                      <p className="text-sm font-medium">{data.lastDefaultDate}</p>
                    </div>
                  </div>
                )}
                
                {data.registrationDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Registration Date</p>
                      <p className="text-sm font-medium">{data.registrationDate}</p>
                    </div>
                  </div>
                )}
                
                {data.lastUpdateDate && (
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Last Update</p>
                      <p className="text-sm font-medium">{data.lastUpdateDate}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Maximum Debt Amount */}
              {data.maxDebtAmount && parseFloat(data.maxDebtAmount) > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Maximum Outstanding Amount</p>
                  <p className="text-2xl font-bold text-risk-danger">
                    €{parseFloat(data.maxDebtAmount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              )}

              {/* Payment History Timeline */}
              {data.paymentHistory && data.paymentHistory.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-3">Payment Status History</p>
                  <div className="space-y-2">
                    {data.paymentHistory.map((status, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-risk-danger mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{status.code}</span>
                          {status.description && (
                            <span className="text-muted-foreground"> - {status.description}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Postal Code (Sociodemographic) */}
              {data.postalCode && (
                <div className="flex items-start gap-3 pt-4 border-t">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Postal Code (Sociodemographic data provided by tenant)
                    </p>
                    <p className="text-sm font-medium">{data.postalCode}</p>
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
