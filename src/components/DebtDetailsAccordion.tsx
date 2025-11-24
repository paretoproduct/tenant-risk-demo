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
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Operation Details
                </h4>
                <div className="space-y-3 pl-6 border-l-2 border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    It identifies the loan behind the debt, showing who issued it, what type of credit it is, and the official operation ID used by the lender when reporting it to the credit bureau.
                  </p>
                  <div>
                    <p className="text-xs text-muted-foreground">Creditor</p>
                    <p className="text-sm font-medium">BANK</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Product</p>
                    <p className="text-sm font-medium">Personal Loan</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground">Operation ID</p>
                    <p className="text-sm font-mono">004938291430001613</p>
                  </div>
                </div>
              </div>
              
              {/* Payment History Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Payment History
                </h4>
                <div className="space-y-4 pl-6 border-l-2 border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    It summarises how the debt has evolved over time — when the tenant first stopped paying, how many installments remain unpaid, how much is still owed, and the most recent status reported by the lender.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">First Default</p>
                      <p className="text-sm font-medium">30/11/2024</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Default</p>
                      <p className="text-sm font-medium">11/05/2025</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Unpaid Installments</p>
                      <p className="text-sm font-medium">6</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Balance Outstanding</p>
                      <p className="text-sm font-medium">€8,629.62</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Maximum Outstanding Amount</p>
                      <p className="text-sm font-medium">€8,629.62</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Debt Status</p>
                      <Badge variant="destructive" className="mt-1">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Status Evolution */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Payment Status Evolution
                </h4>
                <div className="space-y-2 pl-6 border-l-2 border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    This timeline shows how the debt progressed — from early late payments (60–150 days), which indicate several missed installments, to a judicial status, meaning the case has escalated to formal legal action.
                  </p>
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
                  <div className="flex items-start gap-3 p-2 bg-destructive/10 rounded-md border border-destructive/20">
                    <Badge variant="destructive" className="font-mono text-xs min-w-[2rem] justify-center">
                      J
                    </Badge>
                    <span className="text-sm font-medium text-foreground">
                      Judicial status
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Registration Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Registration Details
                </h4>
                <div className="space-y-3 pl-6 border-l-2 border-border">
                  <p className="text-xs text-muted-foreground">
                    The registration date shows when the unpaid debt was first reported to the credit bureau, and the last update reflects the most recent information provided by the lender.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Registration Date</p>
                      <p className="text-sm font-medium">16/02/2025</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Update</p>
                      <p className="text-sm font-medium">08/06/2025</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sociodemographic Mark */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Sociodemographic Mark
                </h4>
                <div className="pl-6 border-l-2 border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      This rating comes from neighborhood demographics, not the tenant's personal data. Areas scored 'A' tend to show lower average risk, while 'F' areas show higher risk, though this still doesn't describe the tenant themselves.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-base font-semibold px-3 py-1">
                        C
                      </Badge>
                      <span className="text-xs text-muted-foreground">(Based on postal code: 28015)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
